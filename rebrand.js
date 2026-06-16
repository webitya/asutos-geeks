const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/api/upload.js',
  'src/pages/api/auth/register.js',
  'src/pages/api/auth/login-otp.js',
  'src/components/Footer.js',
  'src/app/register/page.js',
  'src/app/pro/register/page.js',
  'src/app/page.js',
  'src/app/layout.js',
  'src/app/login/page.js',
  'src/app/contact/page.js',
  'src/app/about/page.js',
  'src/app/admin/login/page.js',
  'src/app/admin/layout.js'
];

for (const file of filesToUpdate) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace exact "Asutos Geeks"
    content = content.replace(/Asutos Geeks/g, 'Wetawork');
    // Replace exact "Asutos geeks" 
    content = content.replace(/Asutos geeks/gi, 'Wetawork');
    // Replace isolated "Asutos"
    content = content.replace(/Asutos/g, 'Wetawork');
    // Replace isolated "asutos"
    content = content.replace(/asutos/g, 'wetawork');
    
    // Special handling for HTML/React structure like Asutos <span...>Geeks</span>
    content = content.replace(/Asutos\s*<span className="text-primary">\s*Geeks\s*<\/span>/g, 'Weta<span className="text-primary">work</span>');

    // Special handling for email
    content = content.replace(/support@asutosgeeks\.com/g, 'support@wetawork.com');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated ' + file);
  } else {
    console.log('Skipped (not found): ' + file);
  }
}
