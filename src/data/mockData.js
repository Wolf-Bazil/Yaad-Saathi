/**
 * YaadSaathi Domain Data & Clinical Telemetry Specifications
 */

export const REGIONAL_MOTIFS = [
  {
    id: 'rhino',
    name: 'Kaziranga Rhino',
    localName: 'এশিঙীয়া গঁড়',
    region: 'Kaziranga, Assam',
    icon: '🦏',
    desc: 'One-horned rhinoceros of Assam floodplain grasslands.',
    color: 'from-amber-100 to-amber-50 text-amber-900 border-amber-200'
  },
  {
    id: 'kettle',
    name: 'Assam Tea Kettle',
    localName: 'অসম চাহ কেটলি',
    region: 'Jorhat Tea Estates',
    icon: '🫖',
    desc: 'Traditional brass kettle serving rich CTC morning chai.',
    color: 'from-emerald-100 to-emerald-50 text-emerald-900 border-emerald-200'
  },
  {
    id: 'japi',
    name: 'Bihu Japi Hat',
    localName: 'বিহু জাপি',
    region: 'Brahmaputra Valley',
    icon: '👒',
    desc: 'Woven conical bamboo hat adorned with red felt and gems.',
    color: 'from-red-100 to-red-50 text-red-900 border-red-200'
  },
  {
    id: 'pine',
    name: 'Shillong Pine',
    localName: 'শিলং পাইন',
    region: 'East Khasi Hills, Meghalaya',
    icon: '🌲',
    desc: 'Evergreen pine cones lining the cool hills of Shillong.',
    color: 'from-teal-100 to-teal-50 text-teal-900 border-teal-200'
  },
  {
    id: 'mask',
    name: 'Majuli Mask',
    localName: 'মাজুলীৰ মুখা',
    region: 'Majuli Island',
    icon: '🎭',
    desc: 'Clay and bamboo masks used in traditional Vaishnavite dance.',
    color: 'from-orange-100 to-orange-50 text-orange-900 border-orange-200'
  },
  {
    id: 'boat',
    name: 'Brahmaputra Boat',
    localName: 'নাও',
    region: 'Guwahati Ghats',
    icon: '⛵',
    desc: 'Hand-carved wooden river boats traversing the sacred river.',
    color: 'from-blue-100 to-blue-50 text-blue-900 border-blue-200'
  }
];

export const CLINICAL_GAMES = [
  {
    id: 'match',
    num: '01',
    title: 'Cultural Memory Match',
    hindiTitle: 'सांस्कृतिक स्मृति मिलान',
    domain: 'Visuospatial & Working Memory',
    clinicalMechanism: 'Stimulates the parahippocampal gyrus and occipitotemporal cortex. Familiar regional objects lower anxiety while exercising spatial retention.',
    context: 'Assam Tea Kettle, Kaziranga Rhino, Bihu Japi, Shillong Pine',
    tag: 'Visuospatial'
  },
  {
    id: 'face',
    num: '02',
    title: 'Personal Face Recall',
    hindiTitle: 'परिवार स्मृति पहचान',
    domain: 'Autobiographical Reminiscence',
    clinicalMechanism: 'Directly combats prosopagnosia (facial blindness in dementia). Uses actual family portraits submitted by caregivers to reinforce facial synaptic pathways.',
    context: 'Grandson Amit in Shillong, Daughter Priya at Durga Puja',
    tag: 'Reminiscence'
  },
  {
    id: 'sequence',
    num: '03',
    title: 'Sequence Pattern Memory',
    hindiTitle: 'क्रम स्मृति अभ्यास',
    domain: 'Executive Function & Attention',
    clinicalMechanism: 'Exercises the dorsolateral prefrontal cortex. Progressively calibrated sequential flash order prevents rapid attention-span deterioration.',
    context: 'Tea Kettle ➔ Rhino ➔ Japi with adaptive exposure timing',
    tag: 'Executive'
  },
  {
    id: 'routine',
    num: '04',
    title: 'Daily Routine Association',
    hindiTitle: 'दैनिक दिनचर्या स्मृति',
    domain: 'Semantic Memory & ADL',
    clinicalMechanism: 'Preserves Activities of Daily Living (ADL). Pairs temporal cues (8:00 AM) with essential motor habits (brushing teeth, morning tea) to safeguard independence.',
    context: 'Time-of-day morning hygiene & medicine adherence cues',
    tag: 'ADL Care'
  }
];

export const RADAR_AXES = [
  { key: 'memory', label: 'Memory', score: 78, prevScore: 68, fullMark: 100 },
  { key: 'attention', label: 'Attention', score: 65, prevScore: 58, fullMark: 100 },
  { key: 'recognition', label: 'Face Recognition', score: 86, prevScore: 72, fullMark: 100 },
  { key: 'reactionSpeed', label: 'Psychomotor Speed', score: 62, prevScore: 59, fullMark: 100 },
  { key: 'reasoning', label: 'ADL Reasoning', score: 74, prevScore: 66, fullMark: 100 },
];

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Caregiver Memory Vault',
    actor: 'Family Caregiver',
    action: 'Uploads grandchild photo ("Amit in Shillong, age 9 with cricket bat") via web portal.',
    result: 'Generates structured, cognitive-safe JSON quiz with positive clues and zero negative buzzer.'
  },
  {
    step: 2,
    title: 'Elderly Interface Launch',
    actor: 'Elderly Patient (Dadi)',
    action: 'Phone launches high-contrast tactile view with gentle spoken audio in Hindi/Assamese.',
    result: 'Audio speaks: "नमस्ते दादी! आज का खेल शुरू करें?" without cognitive clutter.'
  },
  {
    step: 3,
    title: 'Active Reminiscence Session',
    actor: 'Patient Gameplay',
    action: 'Patient matches Bihu Japi and recognizes Amit from the newly uploaded photo.',
    result: 'Tactile haptic feedback and gentle harmonic chords celebrate recognition.'
  },
  {
    step: 4,
    title: 'The Airplane Mode Kill-Test',
    actor: 'Judge Verification',
    action: 'Turn ON Airplane Mode mid-session on the device. No internet, zero packets.',
    result: '100% uninterrupted gameplay. Session telemetry seamlessly commits to local IndexedDB.'
  },
  {
    step: 5,
    title: 'Network Reconnect & Auto-Flush',
    actor: 'System Re-sync',
    action: 'Disable Airplane Mode. Wi-Fi connects.',
    result: 'IndexedDB flushes queued session telemetry to Supabase in 280ms.'
  },
  {
    step: 6,
    title: 'Longitudinal Telemetry Update',
    actor: 'ASHA Worker & Caregiver',
    action: 'Caregiver Dashboard reflects updated 5-spoke radar telemetry & psychomotor stability check.',
    result: 'IsolationForest model confirms normal psychomotor latency, ruling out acute delirium or UTI.'
  }
];

export const RESEARCH_EVIDENCE = [
  {
    stat: '8.8M+',
    label: 'Dementia Patients in India',
    source: 'LASI / ICMR (Longitudinal Ageing Study in India)',
    detail: '7.4% of Indians aged 60+ live with dementia, projected to double by 2036.'
  },
  {
    stat: '<1 : 250k',
    label: 'Geriatric Neurologist Deficit',
    source: 'NER Healthcare Survey & Lancet Neurology',
    detail: 'North Eastern hill states face severe specialist scarcity, leaving rural elderly unassisted.'
  },
  {
    stat: '85%+',
    label: 'Unpaid Family Caregiver Burden',
    source: 'ARDSI (Alzheimer’s & Related Disorders Society)',
    detail: 'Family members bear high emotional burnout with zero structured longitudinal tracking tools.'
  },
  {
    stat: '100%',
    label: 'Offline-First Independence',
    source: 'IndexedDB PWA Architecture',
    detail: 'Engineered specifically for terrain blackouts in Assam, Meghalaya, Arunachal & Mizoram.'
  }
];

export const NER_STATES = [
  'Assam', 'Meghalaya', 'Arunachal Pradesh', 'Mizoram', 
  'Nagaland', 'Manipur', 'Tripura', 'Sikkim'
];
