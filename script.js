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

let reportData = {
    roles: [],
    marketMatch: "",
    tasks: [],
    keywords: [],
    strategy: []
};

const totalSteps = 7;

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
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 1 de 7 • IKIGAI (Lo que amas)</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-3">¿Qué actividades, temas o pasiones disfrutas hacer en tu día a día?</h2>
            <p class="text-slate-400 text-sm mb-6">Describe qué te motiva genuinamente, qué temas investigas por gusto o qué problemas te apasiona resolver.</p>
            <textarea id="input-passion" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-100 focus:outline-none focus:border-[#00d2c4] placeholder-slate-600 text-sm" placeholder="Ej: Me encanta escribir, analizar datos, organizar proyectos creativos o ayudar a personas...">${userData.passion || ''}</textarea>
        `;
    } else if (currentStep === 2) {
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 2 de 7 • IKIGAI (Misión / Impacto)</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-3">¿Qué necesidad del entorno te gustaría resolver o en qué te gustaría aportar valor?</h2>
            <p class="text-slate-400 text-sm mb-6">Piensa en qué tipo de contribución te hace sentir realizado/a al trabajar en proyectos o empresas.</p>
            <textarea id="input-mission" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-slate-100 focus:outline-none focus:border-[#00d2c4] placeholder-slate-600 text-sm" placeholder="Ej: Ayudar a optimizar procesos internos, liderar equipos o simplificar operaciones complejas...">${userData.mission || ''}</textarea>
        `;
    } else if (currentStep >= 3 && currentStep <= 6) {
        const catIndex = currentStep - 3;
        const cat = hardSkillsCategories[catIndex];
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso ${currentStep} de 7 • Habilidades Duras (${cat.title})</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-2">Selecciona todas las habilidades técnicas que poseas:</h2>
            <p class="text-slate-400 text-sm mb-6">Marca las competencias en las que tienes experiencia o conocimientos sólidos.</p>
            <div class="grid sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                ${cat.skills.map(skill => `
                    <label class="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl cursor-pointer transition">
                        <input type="checkbox" value="${skill}" ${userData.hardSkills.includes(skill) ? 'checked' : ''} class="hard-skill-chk w-4 h-4 text-[#00d2c4] rounded bg-slate-900 border-slate-700 focus:ring-[#00d2c4]">
                        <span class="text-sm text-slate-200 select-none">${skill}</span>
                    </label>
                `).join('')}
            </div>
        `;
    } else if (currentStep === 7) {
        container.innerHTML = `
            <span class="text-xs font-semibold text-[#00d2c4] uppercase tracking-wider">Paso 7 de 7 • Habilidades Blandas & Otras</span>
            <h2 class="text-2xl font-bold text-white mt-2 mb-2">Elige exactamente tus 5 Habilidades Blandas (Core Skills) más fuertes:</h2>
            <p class="text-slate-400 text-sm mb-4">Selecciona hasta 5 competencias que definan tu forma de trabajar.</p>
            <div class="grid sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-2 mb-6">
                ${softSkillsList.map(skill => `
                    <label class="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-3 rounded-xl cursor-pointer transition">
                        <input type="checkbox" value="${skill}" ${userData.softSkills.includes(skill) ? 'checked' : ''} onchange="limitSoftSkills(this)" class="soft-skill-chk w-4 h-4 text-[#00d2c4] rounded bg-slate-900 border-slate-700 focus:ring-[#00d2c4]">
                        <span class="text-xs text-slate-200 select-none">${skill}</span>
                    </label>
                `).join('')}
            </div>
            <h3 class="text-sm font-semibold text-slate-300 mb-2">Otras habilidades adicionales (opcional):</h3>
            <input type="text" id="input-other" value="${userData.otherSkills || ''}" placeholder="Ej: Idiomas, herramientas extra..." class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 text-sm focus:outline-none focus:border-[#00d2c4]">
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
    } else if (currentStep >= 3 && currentStep <= 6) {
        const checkboxes = document.querySelectorAll('.hard-skill-chk');
        checkboxes.forEach(chk => {
            if (chk.checked && !userData.hardSkills.includes(chk.value)) {
                userData.hardSkills.push(chk.value);
            } else if (!chk.checked && userData.hardSkills.includes(chk.value)) {
                userData.hardSkills = userData.hardSkills.filter(s => s !== chk.value);
            }
        });
    } else if (currentStep === 7) {
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
    if (currentStep === 7 && userData.softSkills.length === 0) {
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

function populateResults() {
    document.getElementById('summary-passion').textContent = `"${userData.passion}"`;
    document.getElementById('summary-mission').textContent = `"${userData.mission}"`;
    document.getElementById('summary-soft').textContent = userData.softSkills.length > 0 ? userData.softSkills.join(', ') : 'Ninguna';

    let allHard = [...userData.hardSkills];
    if (userData.otherSkills.trim()) allHard.push(`Otro: ${userData.otherSkills}`);
    document.getElementById('summary-hard').textContent = allHard.length > 0 ? allHard.join(', ') : 'Ninguna';

    let matchedRoles = [
        { title: "Project Manager / Coordinador de Operaciones", desc: "Excelente para perfiles polivalentes que conectan diferentes departamentos." },
        { title: "Consultor Generalista / Asesor Estratégico", desc: "Ideal para quienes poseen conocimientos amplios en múltiples áreas." }
    ];

    reportData.roles = matchedRoles;

    document.getElementById('results-roles').innerHTML = matchedRoles.map((r, i) => `
        <div class="bg-slate-950/75 border border-slate-800 p-4 rounded-2xl">
            <span class="text-[#00d2c4] font-bold text-sm">#${i+1}</span>
            <h4 class="text-white font-semibold mt-1 mb-1">${r.title}</h4>
            <p class="text-slate-400 text-xs">${r.desc}</p>
        </div>
    `).join('');

  reportData.marketMatch =
    `Tu propósito y tus fortalezas principales en habilidades blandas (${userData.softSkills.slice(0, 3).join(', ')}) demuestran un perfil versátil.`;

document.getElementById('results-match').innerHTML = `
    <p>${reportData.marketMatch}</p>
`;

    const tasks = [
        `Liderar iniciativas orientadas a tu pasión por: "${userData.passion.substring(0, 50)}..."`,
        "Coordinar equipos de trabajo y optimizar la comunicación interna.",
        "Diseñar planes de acción y reportes de ejecución."
    ];

    reportData.tasks = tasks;

    document.getElementById('results-tasks').innerHTML = tasks.map(t => `
        <div class="bg-slate-950/75 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3">
            <span class="text-[#00d2c4] font-bold mt-0.5">✓</span>
            <p class="text-xs text-slate-300">${t}</p>
        </div>
    `).join('');

    let dynamicKeywords = [...userData.hardSkills.slice(0, 3), "Perfil Multidisciplinar", "Gestión Estratégica"];
    reportData.keywords = dynamicKeywords;
    document.getElementById('results-keywords').innerHTML = dynamicKeywords.map(k => `
        <span class="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl">🔍 ${k}</span>
    `).join('');

   reportData.strategy = [
    "Posicionamiento Integral: Exalta tu capacidad para conectar múltiples áreas en tu currículum.",
    `Valor Diferencial: Haz notar que tu competencia en ${userData.softSkills[0] || 'Resolución de problemas'} te permite adaptarte rápido.`
];

document.getElementById('results-strategy').innerHTML = `
    <div class="space-y-2 text-xs text-slate-300">
        <p><strong>1. Posicionamiento Integral:</strong> Exalta tu capacidad para conectar múltiples áreas en tu currículum.</p>
        <p><strong>2. Valor Diferencial:</strong> Haz notar que tu competencia en <em>${userData.softSkills[0] || 'Resolución de problemas'}</em> te permite adaptarte rápido.</p>
    </div>
`;
}

async function sendResultsByEmail() {
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

    feedback.textContent = "Conectando con el servidor de Nova Reset Studio...";
    feedback.className = "text-xs mt-2 text-[#00d2c4] font-medium animate-pulse";
    feedback.classList.remove('hidden');

    try {
        const response = await fetch('https://nova-reset-backend.vercel.app/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                userData: userData,
                reportData: reportData
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            feedback.textContent = `¡Reporte enviado exitosamente a ${email}! Revisa tu bandeja de entrada.`;
            feedback.className = "text-xs mt-2 text-[#00d2c4] font-semibold";
        } else {
            feedback.textContent = data.message || "Error al procesar el envío. Inténtalo de nuevo.";
            feedback.className = "text-xs mt-2 text-red-400 font-medium";
        }

    } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
        feedback.textContent = "No se pudo conectar con el servidor de correo. Asegúrate de que el backend esté ejecutándose.";
        feedback.className = "text-xs mt-2 text-red-400 font-medium";
    }
}

function resetAssessment() {
    userData = { passion: "", mission: "", softSkills: [], hardSkills: [], otherSkills: "", email: "" };
    currentStep = 0;
    document.getElementById('results-view').classList.add('hidden');
    document.getElementById('welcome-view').classList.remove('hidden');
}