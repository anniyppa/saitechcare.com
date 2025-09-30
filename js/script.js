// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Printer models data with old models from 2015 and earlier
const printerModels = {
    hp: {
        models: ['LaserJet 1010', 'LaserJet 1012', 'LaserJet 1015', 'LaserJet 1018', 'LaserJet 1020', 'LaserJet 1022', 'LaserJet P1005', 'LaserJet P1006', 'LaserJet P1007', 'LaserJet P1008', 'LaserJet P1102', 'LaserJet P1102w', 'LaserJet P1106', 'LaserJet P1108', 'LaserJet P1505', 'LaserJet P1505n', 'LaserJet P2014', 'LaserJet P2015', 'LaserJet P2035', 'LaserJet P2055', 'LaserJet 1320', 'LaserJet 1160', 'LaserJet 3015', 'LaserJet 3020', 'LaserJet 3030', 'LaserJet 3050', 'LaserJet 3052', 'LaserJet 3055', 'LaserJet Pro M404n', 'LaserJet Pro M428fdw'],
        cartridges: {
            'LaserJet 1010': ['Q2612A (12A)'],
            'LaserJet 1012': ['Q2612A (12A)'],
            'LaserJet 1015': ['Q2612A (12A)'],
            'LaserJet 1018': ['Q2612A (12A)'],
            'LaserJet 1020': ['Q2612A (12A)'],
            'LaserJet 1022': ['Q2612A (12A)'],
            'LaserJet P1005': ['CB435A (35A)'],
            'LaserJet P1006': ['CB435A (35A)'],
            'LaserJet P1007': ['CB435A (35A)'],
            'LaserJet P1008': ['CB435A (35A)'],
            'LaserJet P1102': ['CE285A (85A)'],
            'LaserJet P1102w': ['CE285A (85A)'],
            'LaserJet P1106': ['CE285A (85A)'],
            'LaserJet P1108': ['CE285A (85A)'],
            'LaserJet P1505': ['CB436A (36A)'],
            'LaserJet P1505n': ['CB436A (36A)'],
            'LaserJet P2014': ['Q7553A (53A)'],
            'LaserJet P2015': ['Q7553A (53A)'],
            'LaserJet P2035': ['CE505A (05A)'],
            'LaserJet P2055': ['CE505A (05A)', 'CE505X (05X)'],
            'LaserJet 1320': ['Q5949A (49A)'],
            'LaserJet 1160': ['Q5949A (49A)'],
            'LaserJet 3015': ['Q2613A (13A)'],
            'LaserJet 3020': ['Q2613A (13A)'],
            'LaserJet 3030': ['Q2613A (13A)'],
            'LaserJet 3050': ['Q2613A (13A)'],
            'LaserJet 3052': ['Q2613A (13A)'],
            'LaserJet 3055': ['Q2613A (13A)'],
            'LaserJet Pro M404n': ['CF294A (94A)'],
            'LaserJet Pro M428fdw': ['CF294A (94A)']
        }
    },
    canon: {
        models: ['LBP2900', 'LBP2900B', 'LBP3010', 'LBP3010B', 'LBP3018', 'LBP3050', 'LBP3100', 'LBP3108', 'LBP3150', 'LBP3200', 'LBP6000', 'LBP6020', 'MF3010', 'MF4010', 'MF4018', 'MF4120', 'MF4150', 'MF4270', 'MF4320d', 'MF4350d', 'MF4370dn', 'MF4410', 'MF4450', 'MF4550d', 'MF4570dn', 'ImageClass MF3010', 'ImageClass LBP2900B'],
        cartridges: {
            'LBP2900': ['CRG-303'],
            'LBP2900B': ['CRG-303'],
            'LBP3010': ['CRG-703'],
            'LBP3010B': ['CRG-703'],
            'LBP3018': ['CRG-703'],
            'LBP3050': ['CRG-708'],
            'LBP3100': ['CRG-706'],
            'LBP3108': ['CRG-706'],
            'LBP3150': ['CRG-706'],
            'LBP3200': ['CRG-706'],
            'LBP6000': ['CRG-725'],
            'LBP6020': ['CRG-725'],
            'MF3010': ['CRG-725'],
            'MF4010': ['CRG-303'],
            'MF4018': ['CRG-303'],
            'MF4120': ['CRG-303'],
            'MF4150': ['CRG-303'],
            'MF4270': ['CRG-728'],
            'MF4320d': ['CRG-728'],
            'MF4350d': ['CRG-728'],
            'MF4370dn': ['CRG-728'],
            'MF4410': ['CRG-303'],
            'MF4450': ['CRG-303'],
            'MF4550d': ['CRG-728'],
            'MF4570dn': ['CRG-728'],
            'ImageClass MF3010': ['CRG-725'],
            'ImageClass LBP2900B': ['CRG-303']
        }
    },
    brother: {
        models: ['HL-1110', 'HL-1111', 'HL-1112', 'HL-1201', 'HL-1211W', 'HL-2130', 'HL-2135W', 'HL-2140', 'HL-2150N', 'HL-2170W', 'HL-2240', 'HL-2240D', 'HL-2250DN', 'HL-2270DW', 'DCP-1510', 'DCP-1511', 'DCP-1512', 'DCP-1601', 'DCP-1610W', 'DCP-7055', 'DCP-7057', 'DCP-7060D', 'DCP-7065DN', 'DCP-7070DW', 'MFC-1810', 'MFC-1811', 'MFC-1815', 'MFC-1910W', 'MFC-7240', 'MFC-7360N', 'MFC-7460DN', 'MFC-7860DW', 'HL-L2321D', 'DCP-L2541DW'],
        cartridges: {
            'HL-1110': ['TN-1000'],
            'HL-1111': ['TN-1000'],
            'HL-1112': ['TN-1000'],
            'HL-1201': ['TN-1000'],
            'HL-1211W': ['TN-1000'],
            'HL-2130': ['TN-2010'],
            'HL-2135W': ['TN-2010'],
            'HL-2140': ['TN-2120'],
            'HL-2150N': ['TN-2120'],
            'HL-2170W': ['TN-2120'],
            'HL-2240': ['TN-2220'],
            'HL-2240D': ['TN-2220'],
            'HL-2250DN': ['TN-2220'],
            'HL-2270DW': ['TN-2220'],
            'DCP-1510': ['TN-1000'],
            'DCP-1511': ['TN-1000'],
            'DCP-1512': ['TN-1000'],
            'DCP-1601': ['TN-1000'],
            'DCP-1610W': ['TN-1000'],
            'DCP-7055': ['TN-2120'],
            'DCP-7057': ['TN-2120'],
            'DCP-7060D': ['TN-2120'],
            'DCP-7065DN': ['TN-2120'],
            'DCP-7070DW': ['TN-2120'],
            'MFC-1810': ['TN-1000'],
            'MFC-1811': ['TN-1000'],
            'MFC-1815': ['TN-1000'],
            'MFC-1910W': ['TN-1000'],
            'MFC-7240': ['TN-2120'],
            'MFC-7360N': ['TN-2120'],
            'MFC-7460DN': ['TN-2120'],
            'MFC-7860DW': ['TN-2120'],
            'HL-L2321D': ['TN-2365'],
            'DCP-L2541DW': ['TN-2365']
        }
    },
    samsung: {
        models: ['ML-1610', 'ML-1640', 'ML-1641', 'ML-1645', 'ML-1650', 'ML-1651N', 'ML-1660', 'ML-1665', 'ML-1666', 'ML-1670', 'ML-1675', 'ML-1676', 'ML-1710', 'ML-1740', 'ML-1750', 'ML-2010', 'ML-2015', 'ML-2020', 'ML-2161', 'ML-2162', 'ML-2164', 'ML-2165', 'ML-2240', 'ML-2241', 'SCX-3200', 'SCX-3201', 'SCX-3205', 'SCX-3206', 'SCX-3401', 'SCX-3401FH', 'SCX-3405', 'SCX-4016', 'SCX-4100', 'SCX-4200', 'SCX-4216F', 'SCX-4300', 'SCX-4521F', 'Xpress M2020W', 'Xpress M2070FW'],
        cartridges: {
            'ML-1610': ['ML-1610D2'],
            'ML-1640': ['ML-1640D2'],
            'ML-1641': ['ML-1640D2'],
            'ML-1645': ['ML-1640D2'],
            'ML-1650': ['ML-1650D8'],
            'ML-1651N': ['ML-1650D8'],
            'ML-1660': ['MLT-D104S'],
            'ML-1665': ['MLT-D104S'],
            'ML-1666': ['MLT-D104S'],
            'ML-1670': ['MLT-D104S'],
            'ML-1675': ['MLT-D104S'],
            'ML-1676': ['MLT-D104S'],
            'ML-1710': ['ML-1710D3'],
            'ML-1740': ['ML-1710D3'],
            'ML-1750': ['ML-1710D3'],
            'ML-2010': ['MLT-D119S'],
            'ML-2015': ['MLT-D119S'],
            'ML-2020': ['MLT-D111S'],
            'ML-2161': ['MLT-D101S'],
            'ML-2162': ['MLT-D101S'],
            'ML-2164': ['MLT-D101S'],
            'ML-2165': ['MLT-D101S'],
            'ML-2240': ['MLT-D106S'],
            'ML-2241': ['MLT-D106S'],
            'SCX-3200': ['MLT-D104S'],
            'SCX-3201': ['MLT-D104S'],
            'SCX-3205': ['MLT-D104S'],
            'SCX-3206': ['MLT-D104S'],
            'SCX-3401': ['MLT-D101S'],
            'SCX-3401FH': ['MLT-D101S'],
            'SCX-3405': ['MLT-D101S'],
            'SCX-4016': ['SCX-4016D3'],
            'SCX-4100': ['SCX-4100D3'],
            'SCX-4200': ['SCX-4200D3'],
            'SCX-4216F': ['SCX-4216D3'],
            'SCX-4300': ['MLT-D109S'],
            'SCX-4521F': ['MLT-D119S'],
            'Xpress M2020W': ['MLT-D111S'],
            'Xpress M2070FW': ['MLT-D111S']
        }
    },
    epson: {
        models: ['Stylus C79', 'Stylus C90', 'Stylus CX3900', 'Stylus CX4300', 'Stylus CX4900', 'Stylus CX5900', 'Stylus T13', 'Stylus T20E', 'Stylus T21', 'Stylus T22', 'Stylus T40W', 'Stylus T50', 'Stylus T60', 'Stylus TX100', 'Stylus TX110', 'Stylus TX121', 'Stylus TX200', 'Stylus TX210', 'Stylus TX220', 'Stylus TX300F', 'Stylus TX400', 'Stylus TX410', 'WorkForce 30', 'WorkForce 40', 'WorkForce 310', 'WorkForce 315', 'EcoTank L3110', 'EcoTank L3150'],
        cartridges: {
            'Stylus C79': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus C90': ['T0691', 'T0692', 'T0693', 'T0694'],
            'Stylus CX3900': ['T0691', 'T0692', 'T0693', 'T0694'],
            'Stylus CX4300': ['T0551', 'T0552', 'T0553', 'T0554'],
            'Stylus CX4900': ['T0691', 'T0692', 'T0693', 'T0694'],
            'Stylus CX5900': ['T0691', 'T0692', 'T0693', 'T0694'],
            'Stylus T13': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus T20E': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus T21': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus T22': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus T40W': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus T50': ['T0821', 'T0822', 'T0823', 'T0824', 'T0825', 'T0826'],
            'Stylus T60': ['T0851', 'T0852', 'T0853', 'T0854', 'T0855', 'T0856'],
            'Stylus TX100': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX110': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX121': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX200': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX210': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX220': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX300F': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX400': ['T0731', 'T0732', 'T0733', 'T0734'],
            'Stylus TX410': ['T0731', 'T0732', 'T0733', 'T0734'],
            'WorkForce 30': ['T0691', 'T0692', 'T0693', 'T0694'],
            'WorkForce 40': ['T0691', 'T0692', 'T0693', 'T0694'],
            'WorkForce 310': ['T1281', 'T1282', 'T1283', 'T1284'],
            'WorkForce 315': ['T1281', 'T1282', 'T1283', 'T1284'],
            'EcoTank L3110': ['664 Black', '664 Cyan', '664 Magenta', '664 Yellow'],
            'EcoTank L3150': ['664 Black', '664 Cyan', '664 Magenta', '664 Yellow']
        }
    },
    lexmark: {
        models: ['E120', 'E120n', 'E230', 'E232', 'E234', 'E238', 'E240', 'E240n', 'E250d', 'E250dn', 'E260', 'E260d', 'E260dn', 'E320', 'E321', 'E322', 'E323', 'E330', 'E332', 'E340', 'E342n', 'E350d', 'E352dn', 'E360d', 'E360dn', 'T420', 'T420d', 'T420dn', 'T430', 'T430d', 'T430dn', 'X203n', 'X204n', 'X264dn', 'X340', 'X342n', 'MS315dn', 'MS415dn'],
        cartridges: {
            'E120': ['12015SA'],
            'E120n': ['12015SA'],
            'E230': ['24015SA'],
            'E232': ['24015SA'],
            'E234': ['24015SA'],
            'E238': ['24015SA'],
            'E240': ['24015SA'],
            'E240n': ['24015SA'],
            'E250d': ['E250A11A'],
            'E250dn': ['E250A11A'],
            'E260': ['E260A11A'],
            'E260d': ['E260A11A'],
            'E260dn': ['E260A11A'],
            'E320': ['08A0477'],
            'E321': ['08A0477'],
            'E322': ['08A0477'],
            'E323': ['08A0477'],
            'E330': ['34015HA'],
            'E332': ['34015HA'],
            'E340': ['34015HA'],
            'E342n': ['34015HA'],
            'E350d': ['E352H11A'],
            'E352dn': ['E352H11A'],
            'E360d': ['E360H11A'],
            'E360dn': ['E360H11A'],
            'T420': ['12A7405'],
            'T420d': ['12A7405'],
            'T420dn': ['12A7405'],
            'T430': ['12A8425'],
            'T430d': ['12A8425'],
            'T430dn': ['12A8425'],
            'X203n': ['14L0197'],
            'X204n': ['14L0197'],
            'X264dn': ['X264H11G'],
            'X340': ['X340A11G'],
            'X342n': ['X340A11G'],
            'MS315dn': ['51B1000'],
            'MS415dn': ['50F1000']
        }
    },
    xerox: {
        models: ['Phaser 3010', 'Phaser 3040', 'Phaser 3100MFP', 'Phaser 3117', 'Phaser 3121', 'Phaser 3124', 'Phaser 3130', 'Phaser 3140', 'Phaser 3155', 'Phaser 3160', 'Phaser 3200MFP', 'Phaser 3210', 'Phaser 3220', 'Phaser 3250', 'Phaser 3300MFP', 'Phaser 3320', 'Phaser 3420', 'Phaser 3425', 'Phaser 3428', 'Phaser 3450', 'WorkCentre 3119', 'WorkCentre 3210', 'WorkCentre 3220', 'WorkCentre 3315', 'WorkCentre 3325', 'WorkCentre 4118', 'WorkCentre 4150', 'WorkCentre 4250', 'WorkCentre 4260'],
        cartridges: {
            'Phaser 3010': ['106R02183'],
            'Phaser 3040': ['106R02182'],
            'Phaser 3100MFP': ['106R01379'],
            'Phaser 3117': ['106R01159'],
            'Phaser 3121': ['106R01159'],
            'Phaser 3124': ['106R01159'],
            'Phaser 3130': ['106R01159'],
            'Phaser 3140': ['108R00909'],
            'Phaser 3155': ['108R00984'],
            'Phaser 3160': ['108R00984'],
            'Phaser 3200MFP': ['113R00730'],
            'Phaser 3210': ['106R01487'],
            'Phaser 3220': ['106R01487'],
            'Phaser 3250': ['106R01374'],
            'Phaser 3300MFP': ['106R01412'],
            'Phaser 3320': ['106R02304'],
            'Phaser 3420': ['106R01033'],
            'Phaser 3425': ['106R01033'],
            'Phaser 3428': ['106R01246'],
            'Phaser 3450': ['106R00688'],
            'WorkCentre 3119': ['013R00625'],
            'WorkCentre 3210': ['106R01487'],
            'WorkCentre 3220': ['106R01487'],
            'WorkCentre 3315': ['106R02308'],
            'WorkCentre 3325': ['106R02308'],
            'WorkCentre 4118': ['006R01278'],
            'WorkCentre 4150': ['006R01275'],
            'WorkCentre 4250': ['106R01410'],
            'WorkCentre 4260': ['106R01410']
        }
    }
};

// Handle service selection
document.getElementById('service-select').addEventListener('change', function() {
    const printerGroup = document.getElementById('printer-group');
    const modelGroup = document.getElementById('model-group');
    const cartridgeGroup = document.getElementById('cartridge-group');
    
    if (this.value === 'toner-refill' || this.value === 'cartridge-recon') {
        printerGroup.style.display = 'block';
    } else {
        printerGroup.style.display = 'none';
        modelGroup.style.display = 'none';
        cartridgeGroup.style.display = 'none';
    }
});

// Handle printer brand selection
document.getElementById('printer-brand').addEventListener('change', function() {
    const modelSelect = document.getElementById('printer-model');
    const modelGroup = document.getElementById('model-group');
    const cartridgeGroup = document.getElementById('cartridge-group');
    
    modelSelect.innerHTML = '<option value="">Select Printer Model</option>';
    
    if (this.value && printerModels[this.value]) {
        printerModels[this.value].models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        modelGroup.style.display = 'block';
    } else {
        modelGroup.style.display = 'none';
        cartridgeGroup.style.display = 'none';
    }
});

// Handle printer model selection
document.getElementById('printer-model').addEventListener('change', function() {
    const cartridgeSelect = document.getElementById('cartridge-model');
    const cartridgeGroup = document.getElementById('cartridge-group');
    const brand = document.getElementById('printer-brand').value;
    
    cartridgeSelect.innerHTML = '<option value="">Select Cartridge Model</option>';
    
    if (this.value && printerModels[brand] && printerModels[brand].cartridges[this.value]) {
        printerModels[brand].cartridges[this.value].forEach(cartridge => {
            const option = document.createElement('option');
            option.value = cartridge;
            option.textContent = cartridge;
            cartridgeSelect.appendChild(option);
        });
        cartridgeGroup.style.display = 'block';
    } else {
        cartridgeGroup.style.display = 'none';
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = document.getElementById('service-select').value;
    const printerBrand = document.getElementById('printer-brand').value;
    const printerModel = document.getElementById('printer-model').value;
    const cartridgeModel = document.getElementById('cartridge-model').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !service) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Build inquiry message
    let inquiryDetails = `Service: ${service}`;
    if (printerBrand) inquiryDetails += `\nPrinter Brand: ${printerBrand}`;
    if (printerModel) inquiryDetails += `\nPrinter Model: ${printerModel}`;
    if (cartridgeModel) inquiryDetails += `\nCartridge Model: ${cartridgeModel}`;
    
    // Simulate form submission
    alert(`Thank you for your inquiry!\n\n${inquiryDetails}\n\nWe will contact you within 24 hours.`);
    this.reset();
    
    // Hide printer fields
    document.getElementById('printer-group').style.display = 'none';
    document.getElementById('model-group').style.display = 'none';
    document.getElementById('cartridge-group').style.display = 'none';
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and feature items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target > 100) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});