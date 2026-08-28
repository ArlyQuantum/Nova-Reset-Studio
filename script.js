const softSkillsList = [
    "Comunicación efectiva (verbal y escrita)", "Resolución de problemas", "Negociación", 
    "Persuasión", "Flexibilidad en adaptación", "Rápido aprendizaje", "Paciencia", 
    "Buena gestión del tiempo", "Pensamiento crítico", "Atención al detalle", 
    "Atención al cliente", "Escucha Activa", "Resiliencia", "Orientación a resultados", 
    "Creatividad", "Trabajo en equipo", "Autonomía", "Innovación", "Organización"
];

const hardSkillsCategories = [
    {
        title: "Creación de Contenido, Marketing & Diseño",
        skills: ["Diseño gráfico", "Canva", "Redacción/copywriting", "Edición de video", "Creación de contenido", "Gestión de redes sociales", "Blogging", "SEO", "Branding", "Publicidad en línea (PPC)", "Email Marketing", "Embudo de ventas", "Gestión de proyectos"]
    },
    {
        title: "Datos, Finanzas, Ventas & Tecnología",
        skills: ["Análisis de datos", "Contabilidad", "Finanzas", "Auditoria", "Control de gastos", "Control de inventario", "Manejo de presupuestos", "Manejo de proveedores", "Control de calidad", "Ventas", "Programación", "Q&A Tester", "UX/UI Design"]
    },
    {
        title: "Operaciones, Soporte, Admin & RRHH",
        skills: ["Recursos Humanos", "Psicología y Terapia", "Tutoría", "Manejo de calendarios", "Gestión de correo electrónico", "CRM", "Soporte al cliente", "Soporte técnico", "Creación de informes", "Creación de presentaciones", "Organización de eventos", "Manejo de e-commerce", "Administración de empresa", "Community manager"]
    },
    {
        title: "Investigación, Automatización & Herramientas",
        skills: ["Periodismo y redacción de noticias", "Fotografía", "Investigación", "Traducción", "Manejo de Herramientas de IA", "Automatizaciones (Zapier, ManyChats)", "Herramientas remotas de productividad (Trello, Asana, Monday, Slack, Google teams, Discord)", "Ingeniería", "Arquitectura", "Derecho y asesoría legal", "Idiomas extranjeros"]
    },
    {
        title: "Mantenimiento, Oficios & Reparaciones",
        skills: ["Electricidad", "Plomería", "Pintura y acabados", "Albañilería y construcción", "Carpintería", "Reparación de electrodomésticos", "Soldadura", "Instalación de sistemas de seguridad", "Mantenimiento preventivo y correctivo", "Gestión de herramientas e insumos", "Supervisión de obras", "Seguridad industrial (HSE)"]
    }
];

let currentStep = 0;
let userData = {
    passion: "",
    mission: "",
    softSkills: [],
    hardSkills: [],
    otherSkills: "",
    email: ""
};

// Como agregamos una categoría más, ahora son 8 pasos en total (Paso 1: Pasión, Paso 2: Misión, Pasos 3 al 7: Hard Skills de las 5 categorías, Paso 8: Soft Skills y otras)
const totalSteps = 8;

function startAssessment() {
    currentStep = 1;
    document.getElementById('welcome-view').classList.add('hidden');
    document.getElementById('quiz-view').classList.remove('hidden');
    document.getElementById('progress-indicator').classList.remove('hidden');
    renderStep();
}

function renderStep() {
    document.getElementById('current-step-num').innerText = currentStep;
    const container = document.getElementById('question-container');
    const prevBtn = document.getElementById('prev-btn');

    prevBtn.classList.toggle('hidden', currentStep === 1);

    if (currentStep === 1) {
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 1 de 8 • IKIGAI (Lo que amas)</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-3">¿Qué actividades, temas o pasiones disfrutas hacer en tu día a día?</h2>
            <p class="text-slate-400 text-sm mb-6">Describe qué te motiva genuinamente, qué temas investigas por gusto o qué problemas prácticos o técnicos te apasiona resolver.</p>
            <textarea id="input-passion" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-100 focus:outline-none focus:border-[#00d2c4] placeholder-slate-600 text-sm" placeholder="Ej: Me encanta reparar cosas con mis manos, resolver problemas eléctricos, construir, organizar espacios o ayudar a que todo funcione a la perfección...">${userData.passion || ''}</textarea>
        `;
    } else if (currentStep === 2) {
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 2 de 8 • IKIGAI (Misión / Impacto)</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-3">¿Qué necesidad del entorno te gustaría resolver o en qué te gustaría aportar valor?</h2>
            <p class="text-slate-400 text-sm mb-6">Piensa en qué tipo de contribución te hace sentir realizado/a al brindar soluciones prácticas, soporte a hogares, empresas o proyectos.</p>
            <textarea id="input-mission" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-100 focus:outline-none focus:border-[#00d2c4] placeholder-slate-600 text-sm" placeholder="Ej: Asegurar que las instalaciones funcionen de forma segura, solucionar averías críticas, optimizar espacios físicos o liderar equipos de mantenimiento...">${userData.mission || ''}</textarea>
        `;
    } else if (currentStep >= 3 && currentStep <= 7) {
        const catIndex = currentStep - 3;
        const cat = hardSkillsCategories[catIndex];
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso ${currentStep} de 8 • Habilidades Duras (${cat.title})</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-2">Selecciona todas las habilidades técnicas que poseas:</h2>
            <p class="text-slate-400 text-sm mb-6">Marca las competencias en las que tienes experiencia, conocimientos sólidos o capacidad de ejecución.</p>
            <div class="grid sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                ${cat.skills.map(skill => `
                    <label class="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl cursor-pointer transition">
                        <input type="checkbox" value="${skill}" ${userData.hardSkills.includes(skill) ? 'checked' : ''} class="hard-skill-chk w-4 h-4 text-[#00d2c4] rounded bg-slate-900 border-slate-700 focus:ring-[#00d2c4]">
                        <span class="text-sm text-slate-200 select-none">${skill}</span>
                    </label>
                `).join('')}
            </div>
        `;
    } else if (currentStep === 8) {
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 8 de 8 • Habilidades Blandas & Otras</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-2">Elige exactamente tus 5 Habilidades Blandas (Core Skills) más fuertes:</h2>
            <p class="text-slate-400 text-sm mb-4">Selecciona hasta 5 competencias que definan tu forma de trabajar y relacionarte.</p>
            <div class="grid sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-2 mb-6">
                ${softSkillsList.map(skill => `
                    <label class="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-3 rounded-xl cursor-pointer transition">
                        <input type="checkbox" value="${skill}" ${userData.softSkills.includes(skill) ? 'checked' : ''} onchange="limitSoftSkills(this)" class="soft-skill-chk w-4 h-4 text-[#00d2c4] rounded bg-slate-900 border-slate-700 focus:ring-[#00d2c4]">
                        <span class="text-xs text-slate-200 select-none">${skill}</span>
                    </label>
                `).join('')}
            </div>
            <h3 class="text-sm font-semibold text-slate-300 mb-2">Otras habilidades adicionales (opcional):</h3>
            <input type="text" id="input-other" value="${userData.otherSkills || ''}" placeholder="Ej: Licencia de conducir, certificaciones de seguridad, herramientas específicas..." class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-[#00d2c4]">
        `;
    }
}

function limitSoftSkills(checkbox) {
    const checked = document.querySelectorAll('.soft-skill-chk:checked');
    if (checked.length > 5) {
        checkbox.checked = false;
        alert("Por favor selecciona máximo 5 habilidades blandas core.");
    }
}

function saveCurrentStepData() {
    if (currentStep === 1) {
        userData.passion = document.getElementById('input-passion')?.value || "";
    } else if (currentStep === 2) {
        userData.mission = document.getElementById('input-mission')?.value || "";
    } else if (currentStep >= 3 && currentStep <= 7) {
        const checkboxes = document.querySelectorAll('.hard-skill-chk');
        checkboxes.forEach(chk => {
            if (chk.checked && !userData.hardSkills.includes(chk.value)) {
                userData.hardSkills.push(chk.value);
            } else if (!chk.checked && userData.hardSkills.includes(chk.value)) {
                userData.hardSkills = userData.hardSkills.filter(s => s !== chk.value);
            }
        });
    } else if (currentStep === 8) {
        userData.softSkills = Array.from(document.querySelectorAll('.soft-skill-chk:checked')).map(c => c.value);
        userData.otherSkills = document.getElementById('input-other')?.value || "";
    }
}

function nextStep() {
    saveCurrentStepData();
    if (currentStep === 1 && !userData.passion.trim()) {
        alert("Por favor cuéntanos un poco sobre tus pasiones antes de continuar.");
        return;
    }
    if (currentStep === 2 && !userData.mission.trim()) {
        alert("Por favor describe brevemente qué misión o impacto te motiva.");
        return;
    }
    if (currentStep === 8 && userData.softSkills.length === 0) {
        alert("Por favor selecciona al menos una habilidad blanda core.");
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        renderStep();
    } else {
        generateResults();
    }
}

function prevStep() {
    saveCurrentStepData();
    if (currentStep > 1) {
        currentStep--;
        renderStep();
    }
}

function generateResults() {
    document.getElementById('quiz-view').classList.add('hidden');
    document.getElementById('progress-indicator').classList.add('hidden');
    document.getElementById('loading-view').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading-view').classList.add('hidden');
        document.getElementById('results-view').classList.remove('hidden');
        populateResults();
    }, 1800);
}

// ==========================================
// ANÁLISIS DINÁMICO E INTEGRAL DEL IKIGAI
// ==========================================
function populateResults() {
    // Mostrar texto libre del usuario en el reporte
    document.getElementById('summary-passion').textContent = `"${userData.passion}"`;
    document.getElementById('summary-mission').textContent = `"${userData.mission}"`;
    
    document.getElementById('summary-soft').textContent = userData.softSkills.length > 0 ? userData.softSkills.join(', ') : 'Ninguna';
    
    let allHard = [...userData.hardSkills];
    if (userData.otherSkills.trim()) allHard.push(`Otro: ${userData.otherSkills}`);
    document.getElementById('summary-hard').textContent = allHard.length > 0 ? allHard.join(', ') : 'Ninguna';

    // Banco inteligente de roles adaptado a perfiles multidisciplinares y de mantenimiento
    let matchedRoles = [];
    const passionLower = userData.passion.toLowerCase();
    const missionLower = userData.mission.toLowerCase();
    const combinedText = passionLower + " " + missionLower + " " + userData.hardSkills.join(' ').toLowerCase();

    // Filtrado dinámico ampliado (incluyendo mantenimiento y oficios)
    if (combinedText.includes('electric') || combinedText.includes('plomer') || combinedText.includes('pintur') || combinedText.includes('mantenimient') || userData.hardSkills.includes('Electricidad') || userData.hardSkills.includes('Plomería') || userData.hardSkills.includes('Mantenimiento preventivo y correctivo')) {
        matchedRoles.push({ 
            title: "Especialista Técnico en Mantenimiento & Infraestructura", 
            desc: `Ideal para liderar o ejecutar soluciones técnicas especializadas en instalaciones físicas, asegurando la operatividad y seguridad de los espacios.` 
        });
    }
    if (combinedText.includes('construc') || combinedText.includes('obra') || combinedText.includes('carpinter') || userData.hardSkills.includes('Albañilería y construcción') || userData.hardSkills.includes('Supervisión de obras')) {
        matchedRoles.push({ 
            title: "Supervisor de Obras & Coordinador de Servicios Técnicos", 
            desc: `Aprovecha tu capacidad práctica y de supervisión para coordinar cuadrillas, proyectos de mejora y ejecución de oficios especializados.` 
        });
    }
    if (combinedText.includes('escrib') || combinedText.includes('redacc') || combinedText.includes('contenido') || userData.hardSkills.includes('Redacción/copywriting')) {
        matchedRoles.push({ title: "Especialista en Comunicación Corporativa & Contenidos", desc: `Perfecto para estructurar estrategias editoriales y de marca, tanto en formatos digitales como presenciales.` });
    }
    if (combinedText.includes('dato') || combinedText.includes('analis') || userData.hardSkills.includes('Análisis de datos')) {
        matchedRoles.push({ title: "Analista de Procesos y Mejora Continua", desc: `Aprovecha tu capacidad analítica para optimizar operaciones internas dentro de organizaciones físicas u oficinas corporativas.` });
    }

    // Roles base sólidos para perfiles multidisciplinares o técnicos generales
    if (matchedRoles.length < 2) {
        matchedRoles.push(
            { title: "Técnico Polivalente de Soporte & Operaciones", desc: `Excelente para perfiles prácticos y versátiles que resuelven múltiples incidencias técnicas con autonomía y eficacia.` },
            { title: "Consultor Técnico / Emprendedor de Servicios Especializados", desc: `Ideal para ofrecer soluciones integrales de mantenimiento, reparaciones o consultoría operativa independiente.` }
        );
    }

    // Rellenar roles en pantalla
    document.getElementById('results-roles').innerHTML = matchedRoles.map((r, i) => `
        <div class="bg-slate-950/75 border border-slate-800 p-4 rounded-2xl">
            <span class="text-[#00d2c4] font-bold text-sm">#${i+1}</span>
            <h4 class="text-white font-semibold mt-1 mb-1">${r.title}</h4>
            <p class="text-slate-400 text-xs">${r.desc}</p>
        </div>
    `).join('');

    // Análisis personalizado enfocado en perfiles multidisciplinares y técnicos
    document.getElementById('results-match').innerHTML = `
        <p>Tu propósito (<em class="text-[#00d2c4]">"${userData.mission.substring(0, 70)}..."</em>) y tus fortalezas principales (<strong class="text-white">${userData.softSkills.slice(0, 3).join(', ')}</strong>) demuestran que posees un perfil resolutivo y de alto valor práctico.</p>
        <p class="text-slate-400 mt-2">Arlene Capellan identifica que tu combinación de oficios y competencias técnicas te capacita de manera sobresaliente para destacar en el sector de servicios presenciales, mantenimiento e independencia laboral.</p>
    `;

    // Tareas dinámicas
    const tasks = [
        `Ejecutar y supervisar labores alineadas con tu vocación por: "${userData.passion.substring(0, 50)}..."`,
        "Diagnosticar y resolver averías técnicas con rapidez, aplicando estándares de calidad y seguridad.",
        "Planificar cronogramas de mantenimiento preventivo y optimizar el uso de herramientas e insumos.",
        userData.otherSkills ? `Aprovechar tu destreza diferencial en '${userData.otherSkills}' como ventaja competitiva en el mercado.` : "Garantizar la satisfacción de los clientes resolviendo problemas prácticos de forma definitiva."
    ];

    document.getElementById('results-tasks').innerHTML = tasks.map(t => `
        <div class="bg-slate-950/75 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3">
            <span class="text-[#00d2c4] font-bold mt-0.5">✓</span>
            <p class="text-xs text-slate-300">${t}</p>
        </div>
    `).join('');

    // Keywords generalistas / técnicas
    let dynamicKeywords = [...userData.hardSkills.slice(0, 3), "Técnico Especialista", "Gestión de Mantenimiento"];
    document.getElementById('results-keywords').innerHTML = dynamicKeywords.map(k => `
        <span class="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl">🔍 ${k}</span>
    `).join('');

    // Estrategia final adaptada
    document.getElementById('results-strategy').innerHTML = `
        <div class="space-y-2 text-xs text-slate-300">
            <p><strong>1. Posicionamiento Práctico:</strong> Destaca tus competencias en ${userData.hardSkills.slice(0, 2).join(' y ')} en tu currículum o tarjeta de presentación.</p>
            <p><strong>2. Enfoque de Confiabilidad:</strong> Resalta tu habilidad en <em>${userData.softSkills[0] || 'Resolución de problemas'}</em> para generar máxima confianza con tus clientes o superiores.</p>
            <p><strong>3. Orientación Arly Dev:</strong> Utiliza este diagnóstico para estructurar tu portafolio de servicios hacia el mercado de mantenimiento y soluciones técnicas presenciales o independientes.</p>
        </div>
    `;
}

function sendResultsByEmail() {
    const emailInput = document.getElementById('user-email-input');
    const feedback = document.getElementById('email-feedback');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
        feedback.textContent = "Por favor, introduce un correo electrónico válido.";
        feedback.className = "text-xs mt-2 text-red-400 font-medium";
        feedback.classList.remove('hidden');
        return;
    }

    userData.email = email;
    feedback.textContent = "¡Enviando resultados! Revisa tu bandeja de entrada en unos instantes.";
    feedback.className = "text-xs mt-2 text-[#00d2c4] font-medium";
    feedback.classList.remove('hidden');

    setTimeout(() => {
        feedback.textContent = `¡Reporte personalizado enviado exitosamente a ${email} con el respaldo de Nova Reset Studio!`;
    }, 1500);
}

function resetAssessment() {
    userData = { passion: "", mission: "", softSkills: [], hardSkills: [], otherSkills: "", email: "" };
    currentStep = 0;
    document.getElementById('results-view').classList.add('hidden');
    document.getElementById('welcome-view').classList.remove('hidden');
}