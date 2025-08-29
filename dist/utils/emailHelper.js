// src/utils/emailHelper.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class EmailHelper {
    /**
     * Load HTML template and replace placeholders
     */
    static async loadActivationTemplate(data) {
        try {
            // Path to your HTML template
            const templatePath = path.join(__dirname, '..', 'templates', 'activation-email.html');
            console.log('Loading template from:', templatePath); // Debug log
            // Check if file exists
            if (!fs.existsSync(templatePath)) {
                // Try alternative path from project root
                const altPath = path.join(process.cwd(), 'src', 'templates', 'activation-email.html');
                console.log('Template not found, trying alternative path:', altPath);
                if (!fs.existsSync(altPath)) {
                    throw new Error(`Template file not found. Tried:\n1. ${templatePath}\n2. ${altPath}`);
                }
                // Use alternative path
                const htmlContent = await fs.promises.readFile(altPath, 'utf-8');
                return this.processTemplate(htmlContent, data);
            }
            // Read the HTML file
            const htmlContent = await fs.promises.readFile(templatePath, 'utf-8');
            return this.processTemplate(htmlContent, data);
        }
        catch (error) {
            console.error('Error loading email template:', error);
            throw new Error('Failed to load email template: ' + error.message);
        }
    }
    /**
     * Process template and replace placeholders
     */
    static processTemplate(htmlContent, data) {
        // Replace placeholders with actual data
        const replacements = {
            '{{USER_NAME}}': data.userName,
            '{{USER_EMAIL}}': data.userEmail,
            '{{USER_DEPARTMENT}}': data.userDepartment || 'Not Assigned',
            '{{USER_ROLE}}': data.userRole,
            '{{RESET_URL}}': data.resetUrl,
            '{{COMPANY_NAME}}': data.companyName || process.env.APP_NAME || 'ForPharma'
        };
        // Add password if provided
        if (data.tempPassword) {
            replacements['{{TEMP_PASSWORD}}'] = data.tempPassword;
        }
        // Replace all placeholders
        let processedContent = htmlContent;
        Object.entries(replacements).forEach(([placeholder, value]) => {
            processedContent = processedContent.replace(new RegExp(placeholder, 'g'), value);
        });
        return processedContent;
    }
}
