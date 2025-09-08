#!/usr/bin/env node

/**
 * Manifest Validation Script for MailSense Extension
 * Validates the Chrome extension manifest.json for common issues
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '..', 'manifest.json');

console.log('🔍 Validating MailSense Extension Manifest...\n');

// Check if manifest.json exists
if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ Error: manifest.json not found');
    process.exit(1);
}

try {
    // Read and parse manifest
    const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const manifest = JSON.parse(manifestContent);
    
    let errors = [];
    let warnings = [];
    
    // Required fields validation
    const requiredFields = ['manifest_version', 'name', 'version'];
    requiredFields.forEach(field => {
        if (!manifest[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });
    
    // Manifest version validation
    if (manifest.manifest_version !== 3) {
        errors.push('Manifest version should be 3 for Chrome Extensions MV3');
    }
    
    // Name validation
    if (manifest.name && manifest.name.length > 45) {
        warnings.push('Extension name is longer than 45 characters (may be truncated in store)');
    }
    
    // Description validation
    if (manifest.description && manifest.description.length > 132) {
        warnings.push('Description is longer than 132 characters (may be truncated in store)');
    }
    
    // Version format validation
    if (manifest.version && !/^\d+(\.\d+)*$/.test(manifest.version)) {
        errors.push('Version format should be numeric (e.g., 1.0.0)');
    }
    
    // Permissions validation
    if (manifest.permissions && manifest.permissions.length > 0) {
        const validPermissions = [
            'storage', 'tabs', 'activeTab', 'scripting', 'background',
            'contextMenus', 'notifications', 'alarms', 'identity'
        ];
        
        manifest.permissions.forEach(permission => {
            if (!validPermissions.includes(permission) && !permission.startsWith('http')) {
                warnings.push(`Unknown permission: ${permission}`);
            }
        });
    }
    
    // Content scripts validation
    if (manifest.content_scripts) {
        manifest.content_scripts.forEach((script, index) => {
            if (!script.matches || script.matches.length === 0) {
                errors.push(`Content script ${index} missing matches field`);
            }
            if (!script.js || script.js.length === 0) {
                warnings.push(`Content script ${index} has no JavaScript files`);
            }
        });
    }
    
    // Background script validation (MV3)
    if (manifest.background) {
        if (manifest.background.scripts) {
            errors.push('Manifest V3 should use service_worker instead of scripts in background');
        }
        if (!manifest.background.service_worker) {
            warnings.push('Background service_worker not specified');
        }
    }
    
    // Icons validation
    if (manifest.icons) {
        const recommendedSizes = ['16', '48', '128'];
        recommendedSizes.forEach(size => {
            if (!manifest.icons[size]) {
                warnings.push(`Missing recommended icon size: ${size}x${size}`);
            }
        });
    }
    
    // Check for file existence
    const filesToCheck = [];
    
    if (manifest.background?.service_worker) {
        filesToCheck.push(manifest.background.service_worker);
    }
    
    if (manifest.content_scripts) {
        manifest.content_scripts.forEach(script => {
            if (script.js) filesToCheck.push(...script.js);
            if (script.css) filesToCheck.push(...script.css);
        });
    }
    
    if (manifest.action?.default_popup) {
        filesToCheck.push(manifest.action.default_popup);
    }
    
    if (manifest.options_page) {
        filesToCheck.push(manifest.options_page);
    }
    
    // Check if referenced files exist
    filesToCheck.forEach(file => {
        const filePath = path.join(__dirname, '..', file);
        if (!fs.existsSync(filePath)) {
            errors.push(`Referenced file does not exist: ${file}`);
        }
    });
    
    // Display results
    console.log('📊 Validation Results:');
    console.log('===================');
    
    if (errors.length === 0 && warnings.length === 0) {
        console.log('✅ Manifest is valid! No issues found.');
    } else {
        if (errors.length > 0) {
            console.log('\n❌ Errors:');
            errors.forEach(error => console.log(`   • ${error}`));
        }
        
        if (warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            warnings.forEach(warning => console.log(`   • ${warning}`));
        }
    }
    
    console.log(`\n📈 Summary: ${errors.length} errors, ${warnings.length} warnings`);
    
    // Display manifest info
    console.log('\n📋 Manifest Info:');
    console.log(`   Name: ${manifest.name}`);
    console.log(`   Version: ${manifest.version}`);
    console.log(`   Manifest Version: ${manifest.manifest_version}`);
    console.log(`   Permissions: ${manifest.permissions ? manifest.permissions.length : 0}`);
    console.log(`   Content Scripts: ${manifest.content_scripts ? manifest.content_scripts.length : 0}`);
    
    // Exit with error code if there are errors
    if (errors.length > 0) {
        console.log('\n❌ Validation failed due to errors.');
        process.exit(1);
    } else {
        console.log('\n✅ Validation passed!');
        process.exit(0);
    }
    
} catch (error) {
    console.error('❌ Error parsing manifest.json:', error.message);
    process.exit(1);
}
