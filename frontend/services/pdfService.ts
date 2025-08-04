// services/pdfService.ts
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { OrderDetails, OrderItem } from './orderService';

export interface PDFOptions {
    orderDetails: OrderDetails;
    displayStatus: string;
}

class PDFService {
    private generateOrderHTML(orderDetails: OrderDetails, displayStatus: string): string {
        const currentDate = new Date().toLocaleDateString();

        // Generate items HTML
        const itemsHTML = orderDetails.items.map((item: OrderItem) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; text-align: left;">
          <div style="font-weight: 500; color: #0077B6; font-size: 14px;">
            ${item.name}
          </div>
          ${item.manufacturer ? `<div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${item.manufacturer}</div>` : ''}
        </td>
        <td style="padding: 12px 8px; text-align: center; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; font-size: 14px;">₹${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px 8px; text-align: right; font-size: 14px; font-weight: 500;">₹${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

        const statusColor = displayStatus.toLowerCase() === 'confirmed' ? '#2563eb' : '#ea580c';
        const statusBgColor = displayStatus.toLowerCase() === 'confirmed' ? '#dbeafe' : '#fed7aa';

        return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Order Details - ${orderDetails.orderNumber || orderDetails.orderId}</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.5;
              color: #374151;
              background-color: #f9fafb;
              padding: 20px;
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .header {
              background: #0077B6;
              color: white;
              padding: 24px;
              text-align: center;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            
            .header p {
              font-size: 14px;
              opacity: 0.9;
            }
            
            .order-id-section {
              background: #f8fafc;
              padding: 24px;
              text-align: center;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .order-id {
              font-size: 24px;
              font-weight: 700;
              color: #0077B6;
              margin-bottom: 4px;
            }
            
            .order-id-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              font-weight: 500;
            }
            
            .details-section {
              padding: 24px;
            }
            
            .section-title {
              font-size: 18px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 16px;
              border-bottom: 2px solid #0077B6;
              padding-bottom: 8px;
            }
            
            .detail-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            
            .detail-row:last-child {
              border-bottom: none;
            }
            
            .detail-label {
              font-weight: 500;
              color: #6b7280;
            }
            
            .detail-value {
              font-weight: 600;
              color: #111827;
              text-align: right;
              max-width: 60%;
            }
            
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              background-color: ${statusBgColor};
              color: ${statusColor};
            }
            
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 16px;
            }
            
            .items-table th {
              background: #f9fafb;
              padding: 12px 8px;
              text-align: left;
              font-size: 12px;
              font-weight: 600;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              border-bottom: 2px solid #e5e7eb;
            }
            
            .items-table th:nth-child(2),
            .items-table th:nth-child(3),
            .items-table th:nth-child(4) {
              text-align: center;
            }
            
            .items-table th:nth-child(3),
            .items-table th:nth-child(4) {
              text-align: right;
            }
            
            .total-section {
              background: #f9fafb;
              padding: 16px;
              border-radius: 8px;
              margin-top: 16px;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
            }
            
            .total-row:last-child {
              margin-bottom: 0;
              padding-top: 8px;
              border-top: 1px solid #e5e7eb;
            }
            
            .total-label {
              font-size: 14px;
              color: #6b7280;
            }
            
            .total-value {
              font-weight: 500;
              color: #111827;
            }
            
            .grand-total-label {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
            }
            
            .grand-total-value {
              font-size: 18px;
              font-weight: 700;
              color: #059669;
            }
            
            .instructions-section {
              background: #f9fafb;
              padding: 16px;
              border-radius: 8px;
              margin-top: 16px;
            }
            
            .instructions-text {
              font-size: 14px;
              line-height: 1.6;
              color: #4b5563;
            }
            
            .no-instructions {
              font-style: italic;
              color: #9ca3af;
              text-align: center;
              padding: 24px;
            }
            
            .footer {
              text-align: center;
              padding: 24px;
              border-top: 1px solid #e5e7eb;
              background: #f9fafb;
              font-size: 12px;
              color: #6b7280;
            }
            
            @media print {
              body {
                padding: 0;
                background: white;
              }
              
              .container {
                box-shadow: none;
                border-radius: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>Order Details</h1>
              <p>Generated on ${currentDate}</p>
            </div>
            
            <!-- Order ID Section -->
            <div class="order-id-section">
              <div class="order-id">${orderDetails.orderNumber || orderDetails.orderId}</div>
              <div class="order-id-label">Order ID</div>
            </div>
            
            <!-- Order Details -->
            <div class="details-section">
              <h2 class="section-title">Order Information</h2>
              
              <div class="detail-row">
                <span class="detail-label">Customer</span>
                <span class="detail-value">${orderDetails.customer.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Created By</span>
                <span class="detail-value">${orderDetails.createdBy.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Order Placed</span>
                <span class="detail-value">${orderDetails.orderDate}</span>
              </div>
              
              ${orderDetails.expectedDeliveryDate ? `
                <div class="detail-row">
                  <span class="detail-label">Expected Delivery</span>
                  <span class="detail-value">${orderDetails.expectedDeliveryDate}</span>
                </div>
              ` : ''}
              
              <div class="detail-row">
                <span class="detail-label">Order Status</span>
                <span class="detail-value">
                  <span class="status-badge">${displayStatus}</span>
                </span>
              </div>
            </div>
            
            <!-- Items Section -->
            <div class="details-section">
              <h2 class="section-title">Items Ordered</h2>
              
              ${orderDetails.items.length > 0 ? `
                <table class="items-table">
                  <thead>
                    <tr>
                      <th>Drug Name</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                </table>
                
                <div class="total-section">
                  <div class="total-row">
                    <span class="total-label">Subtotal (${orderDetails.itemCount} items)</span>
                    <span class="total-value">₹${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div class="total-row">
                    <span class="grand-total-label">Total Amount</span>
                    <span class="grand-total-value">₹${orderDetails.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ` : `
                <p style="text-align: center; color: #6b7280; padding: 24px;">No items found</p>
              `}
            </div>
            
            <!-- Special Instructions -->
            <div class="details-section">
              <h2 class="section-title">Special Instructions</h2>
              <div class="instructions-section">
                ${orderDetails.specialInstructions && orderDetails.specialInstructions.length > 0 ? `
                  <div class="instructions-text">${orderDetails.specialInstructions}</div>
                ` : `
                  <div class="no-instructions">No special instructions for this order.</div>
                `}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p>This is a system-generated document. No signature required.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    }

    async generateOrderPDF({ orderDetails, displayStatus }: PDFOptions): Promise<string> {
        try {
            const html = this.generateOrderHTML(orderDetails, displayStatus);

            const { uri } = await Print.printToFileAsync({
                html,
                base64: false,
                width: 612, // 8.5 inches * 72 points/inch
                height: 792, // 11 inches * 72 points/inch
                margins: {
                    left: 20,
                    top: 20,
                    right: 20,
                    bottom: 20,
                },
            });

            // Generate a meaningful filename
            const fileName = `Order_${orderDetails.orderNumber || orderDetails.orderId}_${new Date().toISOString().split('T')[0]}.pdf`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // Move the file to a permanent location with a proper name
            await FileSystem.moveAsync({
                from: uri,
                to: fileUri,
            });

            return fileUri;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error('Failed to generate PDF');
        }
    }

    async shareOrderPDF(pdfUri: string): Promise<void> {
        try {
            const isAvailable = await Sharing.isAvailableAsync();

            if (!isAvailable) {
                throw new Error('Sharing is not available on this device');
            }

            await Sharing.shareAsync(pdfUri, {
                mimeType: 'application/pdf',
                dialogTitle: 'Share Order Details',
                UTI: 'com.adobe.pdf',
            });
        } catch (error) {
            console.error('Error sharing PDF:', error);
            throw new Error('Failed to share PDF');
        }
    }

    async generateAndShareOrderPDF(options: PDFOptions): Promise<void> {
        try {
            const pdfUri = await this.generateOrderPDF(options);
            await this.shareOrderPDF(pdfUri);
        } catch (error) {
            console.error('Error in generateAndShareOrderPDF:', error);
            throw error;
        }
    }
}

export default new PDFService();