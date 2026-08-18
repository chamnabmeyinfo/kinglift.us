import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle, 
  convertInchesToTwip
} from 'docx';
import type { Product, RFQSubmission } from '../types';

/**
 * Common font stack with native Khmer OpenType font priority:
 * 1. Hanuman / Khmer OS Battambang (Standard Khmer Unicode)
 * 2. Noto Sans Khmer
 * 3. Segoe UI / Arial
 */
const DEFAULT_FONT = 'Hanuman';
const HEADING_FONT = 'Outfit';

/**
 * Export single machinery cutsheet to Microsoft Word (.docx)
 */
export const exportProductToDocx = async (product: Product) => {
  const operatingWeightKg = Math.round(product.specs.operatingWeightLbs * 0.453592);
  const turningRadiusMm = Math.round(product.specs.turningRadiusInches * 25.4);

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: DEFAULT_FONT,
            size: 22, // 11pt
            color: '1E293B'
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              right: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.8)
            }
          }
        },
        children: [
          // Header: Brand & Model
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'KINGLIFT.US — HEAVY MATERIAL HANDLING',
                font: HEADING_FONT,
                bold: true,
                size: 28, // 14pt
                color: 'D97706'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: 'Direct Factory Technical Specification Cutsheet / សន្លឹកទិន្នន័យបច្ចេកទេស',
                italics: true,
                size: 20,
                color: '64748B'
              })
            ]
          }),

          // Product Title Box
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: `${product.modelNumber}: ${product.name}`,
                bold: true,
                size: 32, // 16pt
                color: '0F172A'
              })
            ]
          }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Series: ${product.series} | Category: ${product.category.replace('-', ' ').toUpperCase()}`,
                bold: true,
                color: '475569',
                size: 20
              })
            ]
          }),

          // Description & Tagline
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: product.tagline,
                bold: true,
                color: 'D97706'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: product.description
              })
            ]
          }),

          // Quick Specs Summary Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: '1. Engineering Parameters & Capacities / លក្ខណៈបច្ចេកទេស',
                bold: true,
                size: 26,
                color: '0F172A'
              })
            ]
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            rows: [
              new TableRow({
                children: [
                  createTableCell('Parameter / ប៉ារ៉ាម៉ែត្រ', true, 'F1F5F9', 40),
                  createTableCell('Specification / តម្លៃជាក់ស្តែង', true, 'F1F5F9', 60)
                ]
              }),
              createSpecRow('Rated Load Capacity (ទម្ងន់លើក)', `${product.specs.ratedCapacityLbs.toLocaleString()} lbs (${product.specs.ratedCapacityKg.toLocaleString()} kg)`),
              createSpecRow('Max Lift Height (កម្ពស់លើកអតិបរមា)', `${product.specs.maxLiftHeightInches}" (${product.specs.maxLiftHeightMm} mm)`),
              createSpecRow('Aisle Turning Radius (កាំបត់រង្វង់)', `${product.specs.turningRadiusInches}" (${turningRadiusMm} mm)`),
              createSpecRow('Powertrain (ប្រភពថាមពល)', `${product.specs.powerSource}${product.specs.batterySpecs ? ` — ${product.specs.batterySpecs}` : ''}`),
              createSpecRow('Operating Chassis Weight (ទម្ងន់ម៉ាស៊ីន)', `${product.specs.operatingWeightLbs.toLocaleString()} lbs (${operatingWeightKg.toLocaleString()} kg)`),
              createSpecRow('Standard Fork Dimensions (ទំហំប្រវែងសម)', product.specs.forkLengthInches ? `${product.specs.forkLengthInches}" L × ${product.specs.forkWidthInches || 27}" W` : 'Standard Factory Dimensions'),
              createSpecRow('Direct Factory MSRP (តម្លៃរោងចក្រ)', `$${product.pricing.startingMSRP.toLocaleString()} USD`),
              createSpecRow('Dispatch Lead Time (រយៈពេលបញ្ជូន)', `${product.pricing.leadTimeDays} Business Days from US Hubs`),
              createSpecRow('Powertrain Warranty (ការធានា)', `${product.specs.warrantyMonths} Months Nationwide`)
            ]
          }),

          // Key Highlights & Features
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 120 },
            children: [
              new TextRun({
                text: '2. Standard Features & Safety Systems / លក្ខណៈពិសេស & ប្រព័ន្ធសុវត្ថិភាព',
                bold: true,
                size: 26,
                color: '0F172A'
              })
            ]
          }),
          ...product.features.map(feat => (
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 80 },
              children: [
                new TextRun({
                  text: feat
                })
              ]
            })
          )),

          // Regulatory & Standards
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 120 },
            children: [
              new TextRun({
                text: '3. Certifications & Quality Compliance / បទដ្ឋានស្តង់ដារ',
                bold: true,
                size: 26,
                color: '0F172A'
              })
            ]
          }),
          ...product.certifications.map(cert => (
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: `✓ ${cert}`,
                  bold: true,
                  color: '059669'
                })
              ]
            })
          )),

          // Footer Dispatch Notes
          new Paragraph({
            spacing: { before: 300, after: 60 },
            children: [
              new TextRun({
                text: 'Official Commercial Brand Platform: https://kinglift.us',
                bold: true,
                color: 'D97706'
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Factory Support Hotline: 1-800-555-KING (5464) | Dispatch Hubs: Chicago, Dallas, Atlanta, Ontario CA',
                italics: true,
                size: 18,
                color: '64748B'
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  triggerBlobDownload(blob, `KingLift_${product.modelNumber}_Technical_Spec.docx`);
};

/**
 * Export full official RFQ submission summary to Microsoft Word (.docx)
 */
export const exportRFQToDocx = async (rfq: RFQSubmission) => {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: DEFAULT_FONT,
            size: 22,
            color: '1E293B'
          }
        }
      }
    },
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'KINGLIFT.US — COMMERCIAL RFQ ORDER SPECIFICATION',
                font: HEADING_FONT,
                bold: true,
                size: 28,
                color: 'D97706'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: `Request Reference ID: ${rfq.id} | Date: ${new Date(rfq.submittedAt).toLocaleDateString()}`,
                bold: true,
                size: 20,
                color: '475569'
              })
            ]
          }),

          // Contact Details Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '1. Customer & Delivery Destination / ព័ត៌មានអតិថិជន និងទីតាំង', bold: true, size: 24 })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createSpecRow('Company Name (ក្រុមហ៊ុន)', rfq.companyName),
              createSpecRow('Contact Representative (អ្នកទំនាក់ទំនង)', rfq.fullName),
              createSpecRow('Email Address (អ៊ីមែល)', rfq.email),
              createSpecRow('Phone Number (លេខទូរស័ព្ទ)', rfq.phone),
              createSpecRow('Destination ZIP / Postal Code (លេខកូដប្រៃសណីយ៍)', rfq.zipCode),
              createSpecRow('Procurement Urgency (កាលវិភាគបញ្ជាទិញ)', rfq.urgency.toUpperCase()),
              createSpecRow('Operational Notes / Comments (កំណត់ចំណាំ)', rfq.comments || 'Standard Factory Spec')
            ]
          }),

          // Requested Units Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({ text: '2. Requested Machinery & Quantities / បញ្ជីឧបករណ៍ស្នើសុំ', bold: true, size: 24 })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell('Model (ម៉ូដែល)', true, 'F1F5F9', 30),
                  createTableCell('Description (ឈ្មោះ)', true, 'F1F5F9', 40),
                  createTableCell('Qty (ចំនួន)', true, 'F1F5F9', 15),
                  createTableCell('Unit MSRP (តម្លៃ)', true, 'F1F5F9', 15)
                ]
              }),
              ...rfq.items.map(item => (
                new TableRow({
                  children: [
                    createTableCell(item.modelNumber, true),
                    createTableCell(item.name),
                    createTableCell(String(item.quantity)),
                    createTableCell(`$${item.msrp.toLocaleString()}`)
                  ]
                })
              ))
            ]
          }),

          new Paragraph({
            spacing: { before: 300 },
            children: [
              new TextRun({
                text: 'Guaranteed 2-Hour Response Time • Direct Factory Freight Quotation • ANSI & OSHA Compliant',
                bold: true,
                color: 'D97706'
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  triggerBlobDownload(blob, `KingLift_${rfq.id}_Summary.docx`);
};

/**
 * Helpers
 */
function createSpecRow(label: string, value: string): TableRow {
  return new TableRow({
    children: [
      createTableCell(label, true, 'F8FAFC', 40),
      createTableCell(value, false, 'FFFFFF', 60)
    ]
  });
}

function createTableCell(
  text: string, 
  isBold = false, 
  bgColor?: string, 
  widthPct?: number
): TableCell {
  return new TableCell({
    width: widthPct ? { size: widthPct, type: WidthType.PERCENTAGE } : undefined,
    shading: bgColor ? { fill: bgColor } : undefined,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' }
    },
    children: [
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({
            text,
            bold: isBold,
            size: 20
          })
        ]
      })
    ]
  });
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
