# Email Templates for Fish Record

This directory contains professional email templates for your Fish Record application's authentication system.

## 📧 Available Templates

### 1. **Signup Confirmation Email** (`confirm-signup.html`)
- **Purpose**: Sent when users register for a new account
- **Features**: 
  - Professional branding with Fish Record logo
  - Clear call-to-action button
  - Security information
  - Mobile-responsive design
  - Gradient background matching your app theme

### 2. **Password Reset Email** (`password-reset.html`)
- **Purpose**: Sent when users request password reset
- **Features**:
  - Security-focused design with warning colors
  - Clear instructions for password reset
  - Security tips for new passwords
  - Expiration notice for the reset link

## 🎨 Design Features

### Visual Elements
- **Modern Design**: Clean, professional layout
- **Brand Colors**: Purple/pink gradients matching your Fish Record app
- **Mobile Responsive**: Works perfectly on all devices
- **Typography**: Professional font stack for maximum compatibility

### Security Features
- **Expiration Notices**: Clear information about link expiration
- **Security Warnings**: Important notices about account security
- **Professional Footer**: Contact information and branding

## 🚀 How to Use These Templates

### Step 1: Upload to Supabase
1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Email Templates**
3. Select the template type (Confirm signup / Reset password)
4. Copy the HTML content from the respective file
5. Paste it into the Supabase email template editor
6. Save the changes

### Step 2: Customize (Optional)
You can customize these elements:
- **Logo**: Replace `🐟` emoji with your actual logo URL
- **Colors**: Modify the gradient colors in the CSS
- **Contact Email**: Update `support@fishrecord.com` to your actual support email
- **Company Name**: Ensure "Fish Record" branding matches your needs

### Step 3: Test Your Templates
1. Use Supabase's email template testing feature
2. Try the signup flow with a test email
3. Test the password reset functionality

## 📱 Mobile Optimization

Both templates include:
- Responsive design for mobile devices
- Touch-friendly button sizes
- Readable fonts on small screens
- Proper viewport settings

## 🎯 Template Variables

These templates use Supabase's built-in variables:
- `{{ .ConfirmationURL }}` - The confirmation/reset link
- `{{ .Email }}` - The user's email address

## 🔧 Customization Tips

### Brand Colors
Current color scheme:
- **Primary**: Blue to purple gradient (`#3b82f6` to `#8b5cf6`)
- **Secondary**: Purple to pink gradient (`#6366f1` to `#ec4899`)
- **Warning**: Red to orange gradient (`#ef4444` to `#f97316`)

### Logo Integration
To use your actual logo instead of emoji:
1. Upload your logo to a CDN or hosting service
2. Replace the logo div with an `<img>` tag:
```html
<img src="your-logo-url.png" alt="Fish Record" style="width: 60px; height: 60px;">
```

## 📞 Support

If you need help implementing these templates:
1. Check the Supabase documentation for email templates
2. Test with different email clients (Gmail, Outlook, etc.)
3. Verify all links work correctly in production

## 🎉 Benefits

Using these professional templates will:
- ✅ Increase user trust and credibility
- ✅ Improve brand consistency
- ✅ Reduce email delivery issues
- ✅ Provide better user experience
- ✅ Look professional across all email clients