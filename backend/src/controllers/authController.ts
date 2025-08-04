import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import SchemaManagementService from '../services/SchemaManagementService';


const googleClient = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

// List all valid client IDs for verification of Google ID tokens
const validGoogleClientIds = [
  process.env.GOOGLE_WEB_CLIENT_ID,
  process.env.GOOGLE_IOS_CLIENT_ID,
  process.env.GOOGLE_ANDROID_CLIENT_ID,
].filter(Boolean) as string[];

const schemaService = SchemaManagementService.getInstance();

export const loginController = async (req: Request, res: Response) => {
  try {
    console.log("login request received");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find employee in shared database
    const employee = await schemaService.sharedDb.user.findUnique({
      where: { email },
      include: {
        organization: true,
      },
    });
    console.log("employee find");
    console.log("Employee result:", employee);

    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!employee.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Verify password with bcrypt
    const isValidPassword = await bcrypt.compare(password, employee.password);
    console.log("password validates");

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!employee.organization?.isActive) {
      return res.status(403).json({ error: 'Organization is not active' });
    }
    console.log("creating token");

    // Generate JWT token
    const token = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        organizationId: employee.organizationId,
        role: employee.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    console.log(token);

    // Update last login timestamp
    await schemaService.sharedDb.user.update({
      where: { id: employee.id },
      data: { lastLoginAt: new Date() },
    });
    console.log("returning response to frontend");

    res.json({
      token,
      user: {
        id: employee.id,
        email: employee.email,
        role: employee.role,
        organization: {
          id: employee.organization.id,
          name: employee.organization.name,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  } finally {
    await schemaService.sharedDb.$disconnect();
  }
};




export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'idToken is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: validGoogleClientIds,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const email = payload.email;

    // Find employee by email
    const employee = await schemaService.sharedDb.user.findUnique({
      where: { email },
      include: {
        organization: true,
      },
    });

    if (!employee) {
      // Optionally create employee here or reject the login
      return res.status(401).json({ error: 'No user found with this Google account' });
    }

    if (!employee.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    if (!employee.organization?.isActive) {
      return res.status(403).json({ error: 'Organization is not active' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        organizationId: employee.organizationId,
        role: employee.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    await schemaService.sharedDb.user.update({
      where: { id: employee.id },
      data: { lastLoginAt: new Date() },
    });

    res.json({
      token,
      user: {
        id: employee.id,
        email: employee.email,
        role: employee.role,
        organization: {
          id: employee.organization.id,
          name: employee.organization.name,
        },
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed' });
  } finally {
    await schemaService.sharedDb.$disconnect();
  }
};
