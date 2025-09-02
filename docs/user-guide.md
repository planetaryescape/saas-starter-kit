# User Guide

## Getting Started

### First Time Setup

1. **Sign In**: Use your email or Google account via Clerk authentication
2. **Configure Preferences**:
   - Set your base currency (default: GBP)
   - Choose month start day (1-28)
   - Add your bank accounts
3. **Seed Categories**: Default categories are created automatically

### Adding Bank Accounts

Navigate to Settings → Accounts to add:
- **Bank Accounts**: Current accounts, savings
- **Credit Cards**: For tracking credit spending
- **Cash Account**: For manual cash transactions
- **Digital Wallets**: PayPal, Revolut, etc.

## Importing Transactions

### Upload Bank Statements

1. Click the **+** FAB button
2. Select **Upload Statement**
3. Choose your CSV/PDF file
4. Select the correct bank account
5. Review imported transactions
6. Confirm to save

Supported formats:
- CSV (all major UK banks)
- PDF statements (with table extraction)
- OFX/QIF files

### Capture Receipts

1. Click the **+** FAB button
2. Select **Scan Receipt**
3. Take a photo or select from gallery
4. AI automatically extracts:
   - Merchant name
   - Total amount
   - Date
   - Individual items (if visible)
5. Review and confirm

Tips for better OCR:
- Good lighting
- Flat surface
- Include all text
- Avoid shadows

## Review & Categorization

### Transaction Inbox

New transactions appear in your inbox with:
- **Confidence indicators**: High/Medium/Low
- **Suggested categories**: Based on AI and rules
- **Quick actions**:
  - Swipe right → Confirm
  - Swipe left → Ignore
  - Long press → Split transaction

### Manual Categorization

To change a category:
1. Tap the transaction
2. Select new category from dropdown
3. Optionally create a rule for future

### Creating Rules

Rules automatically categorize future transactions:
1. Go to Settings → Rules
2. Click **Add Rule**
3. Set conditions:
   - If merchant contains "Tesco"
   - Then category = "Groceries"
4. Set priority (higher number = higher precedence)

## Managing Duplicates & Transfers

### Duplicate Detection

The app automatically detects when:
- Same transaction from receipt + bank statement
- Duplicate imports

Review in **Reconcile** tab:
- Confirm duplicates to merge
- Mark as "Not duplicate" if different

### Transfer Detection

Inter-account transfers are automatically detected:
- Credit card payments
- Account transfers
- Cash withdrawals

Transfers don't count as expenses/income.

## Monthly P&L

### View Your P&L

The **Insights** tab shows:
- **Income**: Total money in
- **Expenses**: Total money out
- **Net**: Income - Expenses
- **Savings Rate**: Net/Income percentage

### Category Breakdown

- Tap any category to see merchants
- View trends over time
- Compare to previous months

### Lock Month

After reconciling a month:
1. Go to month view
2. Click **Lock Month**
3. Prevents accidental changes
4. Can unlock if needed

## Natural Language Queries

### Ask Your Money

Use natural language to query your finances:
- "How much did I spend on groceries last month?"
- "What's my average monthly dining expense?"
- "Show me all Amazon purchases this year"
- "Compare this month's spending to last month"

The AI shows:
- Exact query it ran
- Results table
- Natural language summary

## Budgets & Alerts

### Set Category Budgets

1. Go to Settings → Categories
2. Select a category
3. Set monthly budget amount
4. Get alerts at 80% and 100%

### Recurring Bills

The app learns your recurring expenses:
- Subscriptions
- Utilities
- Rent/Mortgage

View upcoming bills in **Upcoming** widget.

## Exporting Data

### Export Formats

- **CSV**: For spreadsheets
- **Excel**: Three sheets (Transactions, P&L, Categories)
- **YNAB**: Compatible with You Need A Budget

### Export Steps

1. Go to Settings → Export
2. Select date range
3. Choose format
4. Select accounts to include
5. Download file

## Mobile Features

### Offline Mode

- Capture receipts offline
- Queue syncs when connected
- View cached data

### Quick Add

Long-press the **+** button for:
- Quick expense (amount + merchant)
- Voice memo transaction
- Photo receipt

### Widgets

Add home screen widgets for:
- Month-to-date spending
- Category breakdown
- Upcoming bills

## Tips & Best Practices

### Daily Habits
- Photograph receipts immediately
- Review inbox weekly
- Categorize as you go

### Monthly Routine
1. Import bank statements
2. Review and categorize all transactions
3. Check for duplicates/transfers
4. Review P&L
5. Lock the month

### Accuracy Tips
- Keep receipt photos until month is locked
- Create rules for regular merchants
- Use tags for tax-deductible expenses
- Split transactions when needed

## Troubleshooting

### Common Issues

**Duplicate transactions appearing:**
- Check duplicate detection settings
- Ensure consistent date formats
- Review canonical ID logic

**Wrong categories:**
- Check rule priorities
- Update merchant aliases
- Retrain with corrections

**Missing transactions:**
- Verify import date range
- Check account selection
- Review filtered views

**OCR errors:**
- Retake photo with better lighting
- Manually edit extracted data
- Report persistent issues

### Getting Help

- Check documentation first
- Use in-app feedback
- Contact support with:
  - Screenshot of issue
  - Steps to reproduce
  - Expected vs actual behavior