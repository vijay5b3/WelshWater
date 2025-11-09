# 📋 Pre-Deployment Checklist

Complete this checklist before pushing to Git and deploying to Vercel.

## ✅ Code Quality

- [ ] All TypeScript files compile without errors
- [ ] No console.log() statements in production code (or commented out)
- [ ] No hardcoded API keys in code
- [ ] All imports are used
- [ ] No unused variables
- [ ] Code is formatted consistently
- [ ] Comments are clear and up-to-date

## ✅ Configuration Files

- [ ] `.gitignore` is present and includes:
  - [ ] `node_modules/`
  - [ ] `.env`
  - [ ] `dist/`
  - [ ] `*.log`
- [ ] `.env.example` created with placeholder values
- [ ] `vercel.json` configured correctly
- [ ] `package.json` has correct repository URL
- [ ] All manifest.json files are valid JSON

## ✅ Documentation

- [ ] README.md is complete with:
  - [ ] Project description
  - [ ] Installation instructions
  - [ ] Usage examples
  - [ ] Configuration guide
  - [ ] API key setup instructions
- [ ] QUICKSTART.md created
- [ ] DEPLOYMENT.md created
- [ ] CONTRIBUTING.md created
- [ ] CHANGELOG.md created
- [ ] LICENSE file added

## ✅ Widget Testing

### Basic Commands
- [ ] `zoom in` works
- [ ] `zoom out` works
- [ ] `zoom to level 10` works
- [ ] `list layers` shows all layers
- [ ] `enable [layer]` works
- [ ] `disable [layer]` works
- [ ] `print` shows template selection
- [ ] `help` displays help message

### Navigation
- [ ] `zoom to Cardiff CF10 1BH` works
- [ ] `navigate to Swansea` works
- [ ] Invalid addresses show error message

### School Queries
- [ ] `schools in Cardiff` returns results
- [ ] `schools with postcode CF10` returns results
- [ ] `find school code 6604025` returns single school
- [ ] `Welsh medium schools` returns filtered results
- [ ] `bilingual schools in Swansea` returns combined filter
- [ ] No results scenario shows appropriate message

### AI Features
- [ ] AI queries are parsed correctly
- [ ] Low confidence triggers manual parsing
- [ ] Follow-up questions work with context
- [ ] Welsh language queries are translated

### Error Handling
- [ ] Invalid commands show helpful error
- [ ] Network errors are caught and displayed
- [ ] Empty results show appropriate message
- [ ] API key errors are handled gracefully

## ✅ Security

- [ ] No API keys committed to repository
- [ ] `.env` is in `.gitignore`
- [ ] API keys are stored in environment variables
- [ ] No sensitive data in logs
- [ ] HTTPS is enabled (required for geocoding)
- [ ] CORS is configured properly

## ✅ Performance

- [ ] Widget loads in < 3 seconds
- [ ] Queries respond in < 5 seconds
- [ ] Large result sets are handled properly
- [ ] No memory leaks (test with long sessions)
- [ ] Images/assets are optimized

## ✅ Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest, Mac only)

## ✅ Mobile Responsiveness

- [ ] Widget displays correctly on mobile
- [ ] Touch interactions work
- [ ] Text is readable on small screens
- [ ] Buttons are tap-friendly

## ✅ Git Repository

- [ ] Repository is initialized
- [ ] All files are committed
- [ ] Commit messages are clear
- [ ] Branch is named appropriately (`main` or `master`)
- [ ] Remote is configured
- [ ] README includes correct repository URL

## ✅ Deployment Preparation

### Vercel
- [ ] Vercel account created
- [ ] `vercel.json` configured
- [ ] Build command is correct
- [ ] Output directory is correct
- [ ] Environment variables documented

### GitHub
- [ ] Repository is public/private as intended
- [ ] Repository description added
- [ ] Topics/tags added for discoverability
- [ ] README looks good on GitHub
- [ ] License is appropriate

## ✅ Post-Deployment

- [ ] Deployed URL is accessible
- [ ] SSL certificate is valid
- [ ] All features work in production
- [ ] API keys are configured in production
- [ ] Error tracking is set up (optional)
- [ ] Analytics are enabled (optional)

## ✅ Final Checks

- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated with release notes
- [ ] All team members have access
- [ ] Backup of current working state
- [ ] Documentation links are working
- [ ] Contact information is current

---

## 🚀 Ready to Deploy!

Once all checkboxes are checked, you're ready to:

1. **Commit and Push to Git:**
   ```bash
   git add .
   git commit -m "Release v1.0.0: Welsh Government Data Chatbot"
   git push origin main
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Test Production:**
   - Visit deployed URL
   - Test all features
   - Verify API keys work
   - Check mobile responsiveness

4. **Announce:**
   - Share with team
   - Update documentation
   - Create release notes

---

## 📝 Notes

Add any specific notes or considerations here:

- 
- 
- 

---

**Checklist completed on:** _______________

**Deployed by:** _______________

**Production URL:** _______________
