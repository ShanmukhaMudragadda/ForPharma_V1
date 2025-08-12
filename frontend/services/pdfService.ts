// services/pdfService.ts
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { OrderDetails, OrderItem } from './orderService';
import { RCPADetailsResponse, AuditItem } from './rcpaService';
import { DCRDetails } from './dcrService';

export interface PDFOptions {
  orderDetails: OrderDetails;
  displayStatus: string;
}

export interface RCPAPDFOptions {
  rcpaDetails: RCPADetailsResponse;
  formatDate: (dateString: string) => string;
}

export interface DCRPDFOptions {
  dcrDetails: DCRDetails;
  customerInfo: {
    name: string;
    address: string;
  };
  taskTimings: string;
  customerLabel: string;
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

  private generateRcpaHTML(rcpaDetails: RCPADetailsResponse, formatDate: (dateString: string) => string): string {
    const currentDate = new Date().toLocaleDateString();

    // Generate audit items HTML
    const auditItemsHTML = rcpaDetails.auditItems.map((item: AuditItem) => `
      <div style="margin-bottom: 20px; background: #f9fafb; padding: 16px; border-radius: 8px;">
        <div style="display: flex; gap: 16px;">
          <!-- Our Product -->
          <div style="flex: 1; background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #0077B6;">
            <div style="font-size: 12px; font-weight: 600; color: #0077B6; text-transform: uppercase; margin-bottom: 8px;">
              Our Product
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #0077B6; margin-bottom: 12px;">
              ${item.ourProduct.name}
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              Qty: ${item.ourProduct.quantity} units
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              Pack: ${item.ourProduct.packSize}
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              Manufacturer: ${item.ourProduct.manufacturer}
            </div>
          </div>
          
          <!-- Competitor Product -->
          <div style="flex: 1; background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #DC3545;">
            <div style="font-size: 12px; font-weight: 600; color: #DC3545; text-transform: uppercase; margin-bottom: 8px;">
              Competitor
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px;">
              ${item.competitor.name}
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              Qty: ${item.competitor.quantity} units
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              Pack: ${item.competitor.packSize}
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              Manufacturer: ${item.competitor.manufacturer}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>RCPA Report - ${rcpaDetails.rcpaId}</title>
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
            
            .rcpa-id-section {
              background: #f8fafc;
              padding: 24px;
              text-align: center;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .rcpa-id {
              font-size: 24px;
              font-weight: 700;
              color: #0077B6;
              margin-bottom: 4px;
            }
            
            .rcpa-id-label {
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
              flex-shrink: 0;
            }
            
            .detail-value {
              font-weight: 600;
              color: #111827;
              text-align: right;
              max-width: 60%;
            }
            
            .stats-section {
              display: flex;
              gap: 16px;
              margin-bottom: 24px;
            }
            
            .stat-card {
              flex: 1;
              background: white;
              padding: 24px;
              border-radius: 8px;
              border: 1px solid #f0f0f0;
              text-align: center;
            }
            
            .stat-number {
              font-size: 32px;
              font-weight: 700;
              color: #0077B6;
              margin-bottom: 8px;
            }
            
            .stat-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              font-weight: 500;
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
              
              .stats-section {
                display: flex !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>RCPA Report</h1>
              <p>Generated on ${currentDate}</p>
            </div>
            
            <!-- RCPA ID Section -->
            <div class="rcpa-id-section">
              <div class="rcpa-id">#${rcpaDetails.rcpaId}</div>
              <div class="rcpa-id-label">RCPA ID</div>
            </div>
            
            <!-- RCPA Details -->
            <div class="details-section">
              <h2 class="section-title">Report Information</h2>
              
              <div class="detail-row">
                <span class="detail-label">Chemist</span>
                <span class="detail-value">${rcpaDetails.chemistName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Created By</span>
                <span class="detail-value">${rcpaDetails.createdBy.name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Observation Date</span>
                <span class="detail-value">${formatDate(rcpaDetails.observationDate)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Total Prescriptions</span>
                <span class="detail-value">${rcpaDetails.totalPrescriptions}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Region</span>
                <span class="detail-value">${rcpaDetails.region}</span>
              </div>
            </div>
            
            <!-- Summary Statistics -->
            <div class="details-section">
              <h2 class="section-title">Summary Statistics</h2>
              <div class="stats-section">
                <div class="stat-card">
                  <div class="stat-number">${rcpaDetails.itemsAudited}</div>
                  <div class="stat-label">Items Audited</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">${rcpaDetails.competitorsFound}</div>
                  <div class="stat-label">Competitors Found</div>
                </div>
              </div>
            </div>
            
            <!-- Audit Items Section -->
            <div class="details-section">
              <h2 class="section-title">Audit Items</h2>
              
              ${rcpaDetails.auditItems.length > 0 ? auditItemsHTML : `
                <p style="text-align: center; color: #6b7280; padding: 24px;">No audit items found for this RCPA report.</p>
              `}
            </div>
            
            <!-- Brief Remarks -->
            <div class="details-section">
              <h2 class="section-title">Brief Remarks</h2>
              <div class="instructions-section">
                ${rcpaDetails.briefRemarks && rcpaDetails.briefRemarks.trim().length > 0 ? `
                  <div class="instructions-text">${rcpaDetails.briefRemarks}</div>
                ` : `
                  <div class="no-instructions">No remarks provided for this RCPA report.</div>
                `}
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p>This is a system-generated RCPA report. No signature required.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateDcrHTML(
    dcrDetails: DCRDetails,
    customerInfo: { name: string; address: string },
    taskTimings: string,
    customerLabel: string
  ): string {
    const currentDate = new Date().toLocaleDateString();

    const statusColor = dcrDetails.status.toLowerCase() === 'completed' ? '#059669' : '#ea580c';
    const statusBgColor = dcrDetails.status.toLowerCase() === 'completed' ? '#d1fae5' : '#fed7aa';

    return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>DCR Report - ${dcrDetails.dcrId}</title>
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
                
                .dcr-id-section {
                  background: #f8fafc;
                  padding: 24px;
                  text-align: center;
                  border-bottom: 1px solid #e5e7eb;
                }
                
                .dcr-id {
                  font-size: 24px;
                  font-weight: 700;
                  color: #0077B6;
                  margin-bottom: 4px;
                }
                
                .dcr-id-label {
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
                  align-items: flex-start;
                  padding: 12px 0;
                  border-bottom: 1px solid #f3f4f6;
                }
                
                .detail-row:last-child {
                  border-bottom: none;
                }
                
                .detail-label {
                  font-weight: 500;
                  color: #6b7280;
                  flex-shrink: 0;
                  width: 30%;
                }
                
                .detail-value {
                  font-weight: 600;
                  color: #111827;
                  text-align: right;
                  width: 65%;
                  word-wrap: break-word;
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
                
                .activity-section {
                  background: #f9fafb;
                  padding: 20px;
                  border-radius: 8px;
                  margin-top: 16px;
                }
                
                .activity-item {
                  margin-bottom: 20px;
                }
                
                .activity-item:last-child {
                  margin-bottom: 0;
                }
                
                .activity-label {
                  font-size: 12px;
                  font-weight: 600;
                  color: #6b7280;
                  text-transform: uppercase;
                  margin-bottom: 8px;
                }
                
                .activity-content {
                  background: white;
                  padding: 16px;
                  border-radius: 6px;
                  border-left: 4px solid #0077B6;
                  font-size: 14px;
                  line-height: 1.6;
                  color: #111827;
                }
                
                .no-content {
                  font-style: italic;
                  color: #9ca3af;
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
                  <h1>Daily Call Report</h1>
                  <p>Generated on ${currentDate}</p>
                </div>
                
                <!-- DCR ID Section -->
                <div class="dcr-id-section">
                  <div class="dcr-id">${dcrDetails.dcrId}</div>
                  <div class="dcr-id-label">DCR ID</div>
                </div>
                
                <!-- DCR Details -->
                <div class="details-section">
                  <h2 class="section-title">Report Information</h2>
                  
                  <div class="detail-row">
                    <span class="detail-label">${customerLabel}</span>
                    <span class="detail-value">${customerInfo.name}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Created By</span>
                    <span class="detail-value">${dcrDetails.createdBy.name}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Task Date & Time</span>
                    <span class="detail-value">${dcrDetails.reportDate} • ${taskTimings}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${customerInfo.address}</span>
                  </div>
                  
                  <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">
                      <span class="status-badge">${dcrDetails.status === 'draft' ? 'Draft' : 'Completed'}</span>
                    </span>
                  </div>
                </div>
                
                <!-- Activity Details Section -->
                <div class="details-section">
                  <h2 class="section-title">Activity Details</h2>
                  
                  <div class="activity-section">
                    <div class="activity-item">
                      <div class="activity-label">Products Promoted</div>
                      <div class="activity-content">
                        ${dcrDetails.productsDiscussed && dcrDetails.productsDiscussed.trim()
        ? dcrDetails.productsDiscussed
        : '<span class="no-content">No products discussed recorded.</span>'
      }
                      </div>
                    </div>
                    
                    <div class="activity-item">
                      <div class="activity-label">Comments & Observations</div>
                      <div class="activity-content">
                        ${dcrDetails.comments && dcrDetails.comments.trim()
        ? dcrDetails.comments
        : '<span class="no-content">No additional comments recorded.</span>'
      }
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                  <p>This is a system-generated Daily Call Report. No signature required.</p>
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

  async generateRcpaPDF({ rcpaDetails, formatDate }: RCPAPDFOptions): Promise<string> {
    try {
      const html = this.generateRcpaHTML(rcpaDetails, formatDate);

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
      const fileName = `RCPA_${rcpaDetails.rcpaId}_${new Date().toISOString().split('T')[0]}.pdf`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Move the file to a permanent location with a proper name
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      return fileUri;
    } catch (error) {
      console.error('Error generating RCPA PDF:', error);
      throw new Error('Failed to generate RCPA PDF');
    }
  }

  async generateDcrPDF({ dcrDetails, customerInfo, taskTimings, customerLabel }: DCRPDFOptions): Promise<string> {
    try {
      const html = this.generateDcrHTML(dcrDetails, customerInfo, taskTimings, customerLabel);

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
      const fileName = `DCR_${dcrDetails.dcrId}_${new Date().toISOString().split('T')[0]}.pdf`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Move the file to a permanent location with a proper name
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      return fileUri;
    } catch (error) {
      console.error('Error generating DCR PDF:', error);
      throw new Error('Failed to generate DCR PDF');
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

  async shareRcpaPDF(pdfUri: string): Promise<void> {
    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        throw new Error('Sharing is not available on this device');
      }

      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share RCPA Report',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Error sharing RCPA PDF:', error);
      throw new Error('Failed to share RCPA PDF');
    }
  }

  async shareDcrPDF(pdfUri: string): Promise<void> {
    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        throw new Error('Sharing is not available on this device');
      }

      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share DCR Report',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Error sharing DCR PDF:', error);
      throw new Error('Failed to share DCR PDF');
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

  async generateAndShareRcpaPDF(options: RCPAPDFOptions): Promise<void> {
    try {
      const pdfUri = await this.generateRcpaPDF(options);
      await this.shareRcpaPDF(pdfUri);
    } catch (error) {
      console.error('Error in generateAndShareRcpaPDF:', error);
      throw error;
    }
  }

  async generateAndShareDcrPDF(options: DCRPDFOptions): Promise<void> {
    try {
      const pdfUri = await this.generateDcrPDF(options);
      await this.shareDcrPDF(pdfUri);
    } catch (error) {
      console.error('Error in generateAndShareDcrPDF:', error);
      throw error;
    }
  }
}

export default new PDFService();
