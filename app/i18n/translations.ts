export type Language = 'en' | 'af' | 'zu' | 'xh' | 'st' | 'tn' | 'nso' | 'ts' | 'ss' | 've' | 'nr';

export const languageNames: Record<Language, string> = {
  en: 'English',
  af: 'Afrikaans',
  zu: 'isiZulu',
  xh: 'isiXhosa',
  st: 'Sesotho',
  tn: 'Setswana',
  nso: 'Sepedi',
  ts: 'Xitsonga',
  ss: 'siSwati',
  ve: 'Tshivenda',
  nr: 'isiNdebele'
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  af: '🇿🇦',
  zu: '🇿🇦',
  xh: '🇿🇦',
  st: '🇿🇦',
  tn: '🇿🇦',
  nso: '🇿🇦',
  ts: '🇿🇦',
  ss: '🇿🇦',
  ve: '🇿🇦',
  nr: '🇿🇦'
};

export interface Translations {
  // Welcome Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  selectLanguage: string;
  startConsultation: string;
  fastLabel: string;
  fastDesc: string;
  privateLabel: string;
  privateDesc: string;
  professionalLabel: string;
  professionalDesc: string;

  // POPIA Screen
  popiaTitle: string;
  popiaContent: string;
  acceptTerms: string;
  decline: string;

  // Registration Screen
  registrationTitle: string;
  fullName: string;
  idNumber: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: string;
  male: string;
  female: string;
  genderOther: string;
  contactNumber: string;
  emailAddress: string;
  continue: string;
  back: string;

  // Medical History Wizard
  medicalHistoryTitle: string;
  existingConditions: string;
  medicationsAllergies: string;
  surgicalHistory: string;
  familyHistory: string;
  lifestyle: string;
  
  // Conditions
  diabetes: string;
  hypertension: string;
  asthma: string;
  heartDisease: string;
  epilepsy: string;
  arthritis: string;
  depression: string;
  cancer: string;
  hivAids: string;
  tuberculosis: string;
  none: string;
  conditionOther: string;
  otherConditions: string;

  // Medications & Allergies
  currentMedications: string;
  drugAllergies: string;
  foodAllergies: string;
  noMedications: string;
  noDrugAllergies: string;
  noFoodAllergies: string;

  // Surgical History
  previousSurgeries: string;
  noSurgeries: string;
  surgeryPlaceholder: string;

  // Family History
  familyHeartDisease: string;
  familyDiabetes: string;
  familyCancer: string;
  familyHypertension: string;
  familyStroke: string;
  familyMentalHealth: string;
  noFamilyHistory: string;

  // Lifestyle
  smoking: string;
  smokingNever: string;
  smokingFormer: string;
  smokingCurrent: string;
  alcohol: string;
  alcoholNever: string;
  alcoholSocial: string;
  alcoholRegular: string;
  alcoholHeavy: string;
  exercise: string;
  exerciseSedentary: string;
  exerciseLight: string;
  exerciseModerate: string;
  exerciseActive: string;

  next: string;
  previous: string;
  
  // Chat Screen
  chatTitle: string;
  chatSubtitle: string;
  typeMessage: string;
  send: string;
  
  // Vitals Screen
  vitalsTitle: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
  height: string;
  
  // Blood Tests Screen
  bloodTestsTitle: string;
  
  // Diagnosis Screen
  diagnosisTitle: string;
  
  // Virtual Doctor Screen
  virtualDoctorTitle: string;
  
  // Payment Screen
  paymentTitle: string;
  
  // Common
  loading: string;
  submit: string;
  cancel: string;
  sessionTimeout: string;
  sessionTimeoutMessage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Your 24/7 Self-Service Health Consultation',
    selectLanguage: 'Select Your Language',
    startConsultation: 'Start Consultation',
    fastLabel: 'Fast',
    fastDesc: '15-minute consultation',
    privateLabel: 'Private',
    privateDesc: 'Confidential & secure',
    professionalLabel: 'Professional',
    professionalDesc: 'AI + Real doctors',

    popiaTitle: 'Privacy & Data Protection Notice',
    popiaContent: 'In accordance with the Protection of Personal Information Act (POPIA), we collect and process your personal health information solely for the purpose of providing medical consultation services. Your data will be stored securely, kept confidential, and never shared with third parties without your explicit consent. You have the right to access, correct, or request deletion of your personal information at any time. By proceeding, you acknowledge that you have read and understood this notice and consent to the collection and processing of your personal information as described.',
    acceptTerms: 'I Accept - Continue',
    decline: 'Decline',

    registrationTitle: 'Patient Registration',
    fullName: 'Full Name',
    idNumber: 'ID Number',
    passportNumber: 'Passport Number',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    genderOther: 'Other',
    contactNumber: 'Contact Number',
    emailAddress: 'Email Address',
    continue: 'Continue',
    back: 'Back',

    medicalHistoryTitle: 'Medical History',
    existingConditions: 'Existing Medical Conditions',
    medicationsAllergies: 'Medications & Allergies',
    surgicalHistory: 'Surgical History',
    familyHistory: 'Family Medical History',
    lifestyle: 'Lifestyle Information',

    diabetes: 'Diabetes',
    hypertension: 'Hypertension (High Blood Pressure)',
    asthma: 'Asthma',
    heartDisease: 'Heart Disease',
    epilepsy: 'Epilepsy',
    arthritis: 'Arthritis',
    depression: 'Depression/Anxiety',
    cancer: 'Cancer',
    hivAids: 'HIV/AIDS',
    tuberculosis: 'Tuberculosis (TB)',
    none: 'None',
    conditionOther: 'Other',
    otherConditions: 'Please specify other conditions',

    currentMedications: 'Current Medications',
    drugAllergies: 'Drug Allergies',
    foodAllergies: 'Food Allergies',
    noMedications: 'No current medications',
    noDrugAllergies: 'No drug allergies',
    noFoodAllergies: 'No food allergies',

    previousSurgeries: 'Previous Surgeries (with dates)',
    noSurgeries: 'No previous surgeries',
    surgeryPlaceholder: 'E.g., Appendectomy - January 2020',

    familyHeartDisease: 'Heart Disease',
    familyDiabetes: 'Diabetes',
    familyCancer: 'Cancer',
    familyHypertension: 'Hypertension',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Mental Health Conditions',
    noFamilyHistory: 'No significant family history',

    smoking: 'Smoking Status',
    smokingNever: 'Never',
    smokingFormer: 'Former Smoker',
    smokingCurrent: 'Current Smoker',
    alcohol: 'Alcohol Consumption',
    alcoholNever: 'Never',
    alcoholSocial: 'Social Drinker',
    alcoholRegular: 'Regular',
    alcoholHeavy: 'Heavy',
    exercise: 'Exercise Level',
    exerciseSedentary: 'Sedentary',
    exerciseLight: 'Light',
    exerciseModerate: 'Moderate',
    exerciseActive: 'Active',

    next: 'Next',
    previous: 'Previous',

    chatTitle: 'AI Doctor Consultation',
    chatSubtitle: 'Describe your symptoms',
    typeMessage: 'Type your message...',
    send: 'Send',

    vitalsTitle: 'Vital Signs',
    bloodPressure: 'Blood Pressure',
    temperature: 'Temperature',
    weight: 'Weight',
    height: 'Height',

    bloodTestsTitle: 'Blood Tests',
    diagnosisTitle: 'Diagnosis',
    virtualDoctorTitle: 'Virtual Doctor',
    paymentTitle: 'Payment',

    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    sessionTimeout: 'Session Timeout',
    sessionTimeoutMessage: 'Your session will expire in 2 minutes due to inactivity.',
  },

  af: {
    welcomeTitle: 'KI Mediese Kiosk',
    welcomeSubtitle: 'Jou 24/7 Selfhelp Gesondheidsraadpleging',
    selectLanguage: 'Kies Jou Taal',
    startConsultation: 'Begin Konsultasie',
    fastLabel: 'Vinnig',
    fastDesc: '15-minuut konsultasie',
    privateLabel: 'Privaat',
    privateDesc: 'Vertroulik & veilig',
    professionalLabel: 'Professioneel',
    professionalDesc: 'KI + Regte dokters',

    popiaTitle: 'Privaatheid & Databeskerming Kennisgewing',
    popiaContent: 'Ingevolge die Wet op die Beskerming van Persoonlike Inligting (POPIA), versamel en verwerk ons jou persoonlike gesondheidsinligting uitsluitlik vir die doel van die verskaffing van mediese konsultasiedienste. Jou data sal veilig gestoor word, vertroulik gehou word, en nooit met derde partye gedeel word sonder jou uitdruklike toestemming nie. Jy het die reg om toegang te verkry, te korrigeer, of die verwydering van jou persoonlike inligting te versoek te eniger tyd. Deur voort te gaan, erken jy dat jy hierdie kennisgewing gelees en verstaan het en toestem tot die versameling en verwerking van jou persoonlike inligting soos beskryf.',
    acceptTerms: 'Ek Aanvaar - Gaan Voort',
    decline: 'Weier',

    registrationTitle: 'Pasiëntregistrasie',
    fullName: 'Volledige Naam',
    idNumber: 'ID Nommer',
    passportNumber: 'Paspoort Nommer',
    dateOfBirth: 'Geboortedatum',
    gender: 'Geslag',
    male: 'Manlik',
    female: 'Vroulik',
    genderOther: 'Ander',
    contactNumber: 'Kontaknommer',
    emailAddress: 'E-posadres',
    continue: 'Gaan Voort',
    back: 'Terug',

    medicalHistoryTitle: 'Mediese Geskiedenis',
    existingConditions: 'Bestaande Mediese Toestande',
    medicationsAllergies: 'Medikasie & Allergieë',
    surgicalHistory: 'Chirurgiese Geskiedenis',
    familyHistory: 'Familiemediese Geskiedenis',
    lifestyle: 'Leefstyl Inligting',

    diabetes: 'Diabetes',
    hypertension: 'Hipertensie (Hoë Bloeddruk)',
    asthma: 'Asma',
    heartDisease: 'Hartsiekte',
    epilepsy: 'Epilepsie',
    arthritis: 'Artritis',
    depression: 'Depressie/Angs',
    cancer: 'Kanker',
    hivAids: 'MIV/VIGS',
    tuberculosis: 'Tuberkulose (TB)',
    none: 'Geen',
    conditionOther: 'Ander',
    otherConditions: 'Spesifiseer asseblief ander toestande',

    currentMedications: 'Huidige Medikasie',
    drugAllergies: 'Dwelm Allergieë',
    foodAllergies: 'Voedsel Allergieë',
    noMedications: 'Geen huidige medikasie',
    noDrugAllergies: 'Geen dwelm allergieë',
    noFoodAllergies: 'Geen voedsel allergieë',

    previousSurgeries: 'Vorige Operasies (met datums)',
    noSurgeries: 'Geen vorige operasies',
    surgeryPlaceholder: 'Bv., Appendektomie - Januarie 2020',

    familyHeartDisease: 'Hartsiekte',
    familyDiabetes: 'Diabetes',
    familyCancer: 'Kanker',
    familyHypertension: 'Hipertensie',
    familyStroke: 'Beroerte',
    familyMentalHealth: 'Geestesgesondheidstoestande',
    noFamilyHistory: 'Geen beduidende familiegeskiedenis',

    smoking: 'Rookstatus',
    smokingNever: 'Nooit',
    smokingFormer: 'Voormalige Roker',
    smokingCurrent: 'Huidige Roker',
    alcohol: 'Alkoholverbruik',
    alcoholNever: 'Nooit',
    alcoholSocial: 'Sosiale Drinker',
    alcoholRegular: 'Gereeld',
    alcoholHeavy: 'Swaar',
    exercise: 'Oefeningsvlak',
    exerciseSedentary: 'Sittend',
    exerciseLight: 'Lig',
    exerciseModerate: 'Matig',
    exerciseActive: 'Aktief',

    next: 'Volgende',
    previous: 'Vorige',

    chatTitle: 'KI Dokter Konsultasie',
    chatSubtitle: 'Beskryf jou simptome',
    typeMessage: 'Tik jou boodskap...',
    send: 'Stuur',

    vitalsTitle: 'Lewenstekens',
    bloodPressure: 'Bloeddruk',
    temperature: 'Temperatuur',
    weight: 'Gewig',
    height: 'Hoogte',

    bloodTestsTitle: 'Bloedtoetse',
    diagnosisTitle: 'Diagnose',
    virtualDoctorTitle: 'Virtuele Dokter',
    paymentTitle: 'Betaling',

    loading: 'Laai...',
    submit: 'Dien In',
    cancel: 'Kanselleer',
    sessionTimeout: 'Sessie Uitgetel',
    sessionTimeoutMessage: 'Jou sessie sal binne 2 minute verval weens onaktiwiteit.',
  },

  zu: {
    welcomeTitle: 'I-AI Medical Kiosk',
    welcomeSubtitle: 'Ukwelulekwa Kwakho Kwezempilo Nge-24/7',
    selectLanguage: 'Khetha Ulimi Lwakho',
    startConsultation: 'Qala Ukwelulekwa',
    fastLabel: 'Ngokushesha',
    fastDesc: 'Ukwelulekwa kwemizuzu eyi-15',
    privateLabel: 'Okuyimfihlo',
    privateDesc: 'Okuyimfihlo & okuphephile',
    professionalLabel: 'Uchwepheshe',
    professionalDesc: 'I-AI + Odokotela bangempela',

    popiaTitle: 'Isaziso Sobumfihlo Nokuvikelwa Kwedatha',
    popiaContent: 'Ngokuhambelana noMthetho Wokuvikela Ulwazi Lomuntu Siqu (POPIA), siqoqa futhi sicubungule ulwazi lwakho lwezempilo lomuntu siqu kuphela ngenhloso yokunikeza izinsizakalo zokwelulekwa kwezokwelapha. Idatha yakho izogcinwa iphephile, igcinwe iyimfihlo, futhi ngeke yabiwe nezinhlangothi zangaphandle ngaphandle kwemvume yakho ecacile. Unelungelo lokufinyelela, ukulungisa, noma ukucela ukususwa kolwazi lwakho lomuntu siqu nganoma yisiphi isikhathi. Ngokuqhubeka, uyavuma ukuthi ufunde futhi uqonde lesi saziso futhi uvuma ukuqoqwa nokucutshungulwa kolwazi lwakho lomuntu siqu njengoba kuchazwe.',
    acceptTerms: 'Ngiyavuma - Qhubeka',
    decline: 'Ngiyana',

    registrationTitle: 'Ukubhalisa Kwesiguli',
    fullName: 'Igama Eligcwele',
    idNumber: 'Inombolo Yesazisi',
    passportNumber: 'Inombolo Yephasiphothi',
    dateOfBirth: 'Usuku Lokuzalwa',
    gender: 'Ubulili',
    male: 'Owesilisa',
    female: 'Owesifazane',
    genderOther: 'Okunye',
    contactNumber: 'Inombolo Yokuxhumana',
    emailAddress: 'Ikheli Le-imeyili',
    continue: 'Qhubeka',
    back: 'Emuva',

    medicalHistoryTitle: 'Umlando Wezokwelapha',
    existingConditions: 'Izimo Zezokwelapha Ezikhona',
    medicationsAllergies: 'Imithi Ne-allergies',
    surgicalHistory: 'Umlando Wokuhlinzwa',
    familyHistory: 'Umlando Wezokwelapha Womndeni',
    lifestyle: 'Ulwazi Lwendlela Yokuphila',

    diabetes: 'Isifo Sikashukela',
    hypertension: 'I-Hypertension (Umfutho Wegazi Ophezulu)',
    asthma: 'I-Asthma',
    heartDisease: 'Isifo Senhliziyo',
    epilepsy: 'I-Epilepsy',
    arthritis: 'I-Arthritis',
    depression: 'Ukucindezeleka/Ukukhathazeka',
    cancer: 'Umdlavuza',
    hivAids: 'I-HIV/AIDS',
    tuberculosis: 'Isifo Sofuba (TB)',
    none: 'Akukho',
    conditionOther: 'Okunye',
    otherConditions: 'Sicela ucacise ezinye izimo',

    currentMedications: 'Imithi Yamanje',
    drugAllergies: 'I-allergies Yezidakamizwa',
    foodAllergies: 'I-allergies Yokudla',
    noMedications: 'Ayikho imithi yamanje',
    noDrugAllergies: 'Ayikho i-allergies yezidakamizwa',
    noFoodAllergies: 'Ayikho i-allergies yokudla',

    previousSurgeries: 'Ukuhlinzwa Kwangaphambilini (namazinga)',
    noSurgeries: 'Akukho ukuhlinzwa kwangaphambilini',
    surgeryPlaceholder: 'Isib., I-Appendectomy - Januwari 2020',

    familyHeartDisease: 'Isifo Senhliziyo',
    familyDiabetes: 'Isifo Sikashukela',
    familyCancer: 'Umdlavuza',
    familyHypertension: 'I-Hypertension',
    familyStroke: 'Ukuqhuma komthambo',
    familyMentalHealth: 'Izimo Zengqondo',
    noFamilyHistory: 'Awukho umlando womndeni obalulekile',

    smoking: 'Isimo Sokubhema',
    smokingNever: 'Angikaze',
    smokingFormer: 'Owake Wabhema',
    smokingCurrent: 'Ongabhemayo Manje',
    alcohol: 'Ukuphuza Utshwala',
    alcoholNever: 'Angikaze',
    alcoholSocial: 'Umphuzimbili',
    alcoholRegular: 'Njalo',
    alcoholHeavy: 'Kakhulu',
    exercise: 'Izinga Lokuvivinya Umzimba',
    exerciseSedentary: 'Okungahambi',
    exerciseLight: 'Okulula',
    exerciseModerate: 'Okuphakathi',
    exerciseActive: 'Okusebenzayo',

    next: 'Okulandelayo',
    previous: 'Okwedlule',

    chatTitle: 'Ukwelulekwa Kodokotela We-AI',
    chatSubtitle: 'Chaza izimpawu zakho',
    typeMessage: 'Thayipha umlayezo wakho...',
    send: 'Thumela',

    vitalsTitle: 'Izimpawu Zokuphila',
    bloodPressure: 'Umfutho Wegazi',
    temperature: 'Izinga Lokushisa',
    weight: 'Isisindo',
    height: 'Ubude',

    bloodTestsTitle: 'Ukuhlolwa Kwegazi',
    diagnosisTitle: 'Ukuhlola',
    virtualDoctorTitle: 'Udokotela Bobunikazi',
    paymentTitle: 'Inkokhelo',

    loading: 'Iyalayisha...',
    submit: 'Thumela',
    cancel: 'Khansela',
    sessionTimeout: 'Isikhathi Seseshini Siphelelwe',
    sessionTimeoutMessage: 'Iseshini yakho izophelelwa isikhathi emizuzwini emi-2 ngenxa yokungasebenzi.',
  },

  xh: {
    welcomeTitle: 'I-AI Medical Kiosk',
    welcomeSubtitle: 'Ingcebiso Yakho Yezempilo ye-24/7',
    selectLanguage: 'Khetha Ulwimi Lwakho',
    startConsultation: 'Qalisa Ingcebiso',
    fastLabel: 'Ngokukhawuleza',
    fastDesc: 'Ingcebiso yemizuzu eyi-15',
    privateLabel: 'Yabucala',
    privateDesc: 'Iyimfihlo kwaye ikhuselekile',
    professionalLabel: 'Ubugcisa',
    professionalDesc: 'I-AI + Oogqirha bokwenyani',

    popiaTitle: 'Isaziso Sobumfihlo Nokukhusela Idatha',
    popiaContent: 'Ngokuhambelana noMthetho Wokukhusela Ulwazi Lomntu (POPIA), siqokelela kwaye sicubungula ulwazi lwakho lwezempilo lomntu kuphela ngeenjongo zokubonelela ngeenkonzo zengcebiso yezonyango. Idatha yakho iya kugcinwa ikhuselekile, igcinwe iyimfihlo, kwaye ayiyi kuthe yabiwe namaqela angaphandle ngaphandle kwemvume yakho ecacileyo. Unelungelo lokufikelela, ukulungisa, okanye ukucela ukususwa kolwazi lwakho lomntu nangaliphi na ixesha. Ngokuqhubeka, uyavuma ukuba ufundile kwaye uyaqonda esi saziso kwaye uyavuma ukuqokelelwa nokucutshungulwa kolwazi lwakho lomntu njengoko kuchaziwe.',
    acceptTerms: 'Ndiyavuma - Qhubeka',
    decline: 'Ndiyala',

    registrationTitle: 'Ubhaliso Lwesigulana',
    fullName: 'Igama Elipheleleyo',
    idNumber: 'Inombolo Yesazisi',
    passportNumber: 'Inombolo Yepasipoti',
    dateOfBirth: 'Umhla Wokuzalwa',
    gender: 'Isini',
    male: 'Indoda',
    female: 'Umfazi',
    genderOther: 'Okunye',
    contactNumber: 'Inombolo Yoqhagamshelwano',
    emailAddress: 'Idilesi Ye-imeyile',
    continue: 'Qhubeka',
    back: 'Emva',

    medicalHistoryTitle: 'Imbali Yezonyango',
    existingConditions: 'Iimeko Zezonyango Ezikhoyo',
    medicationsAllergies: 'Amayeza Ne-allergies',
    surgicalHistory: 'Imbali Yotyando',
    familyHistory: 'Imbali Yezonyango Yosapho',
    lifestyle: 'Ulwazi Lwendlela Yokuphila',

    diabetes: 'Isifo Seswekile',
    hypertension: 'I-Hypertension (Uxinzelelo Lwegazi Oluphezulu)',
    asthma: 'I-Asthma',
    heartDisease: 'Isifo Sentliziyo',
    epilepsy: 'I-Epilepsy',
    arthritis: 'I-Arthritis',
    depression: 'Ukudakumba/Ixhala',
    cancer: 'Umhlaza',
    hivAids: 'I-HIV/AIDS',
    tuberculosis: 'Isifo Sephepha (TB)',
    none: 'Akukho',
    conditionOther: 'Okunye',
    otherConditions: 'Nceda ubalule ezinye iimeko',

    currentMedications: 'Amayeza Angoku',
    drugAllergies: 'I-allergies Yamachiza',
    foodAllergies: 'I-allergies Yokutya',
    noMedications: 'Akukho mayeza angoku',
    noDrugAllergies: 'Akukho i-allergies yamachiza',
    noFoodAllergies: 'Akukho i-allergies yokutya',

    previousSurgeries: 'Utyando Lwangaphambili (nemihla)',
    noSurgeries: 'Akukho tyando lwangaphambili',
    surgeryPlaceholder: 'Umz., I-Appendectomy - Janyuwari 2020',

    familyHeartDisease: 'Isifo Sentliziyo',
    familyDiabetes: 'Isifo Seswekile',
    familyCancer: 'Umhlaza',
    familyHypertension: 'I-Hypertension',
    familyStroke: 'Ukubetha sisigulo',
    familyMentalHealth: 'Iimeko Zengqondo',
    noFamilyHistory: 'Akukho mbali yosapho ibalulekileyo',

    smoking: 'Imeko Yokutshaya',
    smokingNever: 'Andizange',
    smokingFormer: 'Owayetshaya',
    smokingCurrent: 'Otshayayo Ngoku',
    alcohol: 'Ukusela Utywala',
    alcoholNever: 'Andizange',
    alcoholSocial: 'Umseleli Wentlalontle',
    alcoholRegular: 'Rhoqo',
    alcoholHeavy: 'Kakhulu',
    exercise: 'Inqanaba Lokuzivocavoca',
    exerciseSedentary: 'Okuhleli phantsi',
    exerciseLight: 'Okulula',
    exerciseModerate: 'Okuphakathi',
    exerciseActive: 'Okusebenzayo',

    next: 'Okulandelayo',
    previous: 'Okwangaphambili',

    chatTitle: 'Ingcebiso YoGqirha We-AI',
    chatSubtitle: 'Chaza iimpawu zakho',
    typeMessage: 'Chwetheza umyalezo wakho...',
    send: 'Thumela',

    vitalsTitle: 'Iimpawu Zobomi',
    bloodPressure: 'Uxinzelelo Lwegazi',
    temperature: 'Iqondo Lobushushu',
    weight: 'Ubunzima',
    height: 'Ubude',

    bloodTestsTitle: 'Uvavanyo Lwegazi',
    diagnosisTitle: 'Ukuxilongwa',
    virtualDoctorTitle: 'UGqirha Webobunikazi',
    paymentTitle: 'Intlawulo',

    loading: 'Iyalayisha...',
    submit: 'Ngenisa',
    cancel: 'Rhoxisa',
    sessionTimeout: 'Ixesha Leseshini Liphelile',
    sessionTimeoutMessage: 'Iseshini yakho iya kuphelelwa lixesha kwimizuzu emi-2 ngenxa yokungasebenzi.',
  },

  st: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Keletso ya Hao ya Bophelo bo Botle 24/7',
    selectLanguage: 'Kgetha Puo ya Hao',
    startConsultation: 'Qala Keletso',
    fastLabel: 'Kapele',
    fastDesc: 'Keletso ya metsotso e 15',
    privateLabel: 'Lekunutu',
    privateDesc: 'E sephiri & e bolokehileng',
    professionalLabel: 'Setsebi',
    professionalDesc: 'AI + Diingaka tsa nnete',

    popiaTitle: 'Tsebiso ya Lekunutu le Tshireletso ya Boitsebiso',
    popiaContent: 'Ho latela Molao wa Tshireletso ya Tlhahisoleseling ya Motho (POPIA), re bokella le ho sebetsana le tlhahisoleseling ya hao ya bophelo bo botle ya motho feela bakeng sa morero wa ho fana ka ditshebeletso tsa keletso ya bongaka. Boitsebiso ba hao bo tla bolokwa ka mokhoa o sireletsehileng, bo bolokwe e le sephiri, mme ha bo ke ke ba arolelana le mekgatlo e meng ntle le tumello ya hao e hlakileng. O na le tokelo ya ho fumana, ho lokisa, kapa ho kopa ho hlakolwa ha tlhahisoleseling ya hao ya motho ka nako efe kapa efe. Ka ho tswela pele, o amohela hore o badile mme o utlwisisa tsebiso ena mme o dumellana le pokello le ts\'ebetso ya tlhahisoleseling ya hao ya motho jwalo ka ha ho hlalositsweng.',
    acceptTerms: 'Ke a Amohela - Tswela Pele',
    decline: 'Ke a Hana',

    registrationTitle: 'Ngodiso ya Mokudi',
    fullName: 'Lebitso le Feletseng',
    idNumber: 'Nomoro ya Boitsebiso',
    passportNumber: 'Nomoro ya Phasepoto',
    dateOfBirth: 'Letsatsi la Tswalo',
    gender: 'Bong',
    male: 'Monna',
    female: 'Mosadi',
    genderOther: 'E nngwe',
    contactNumber: 'Nomoro ya Mohala',
    emailAddress: 'Aterese ya Imeili',
    continue: 'Tswela Pele',
    back: 'Morao',

    medicalHistoryTitle: 'Nalane ya Bongaka',
    existingConditions: 'Maemo a Bongaka a Teng',
    medicationsAllergies: 'Dihlare le Di-allergies',
    surgicalHistory: 'Nalane ya Diketsahalo tsa Bongaka',
    familyHistory: 'Nalane ya Bongaka ya Lelapa',
    lifestyle: 'Tlhahisoleseling ya Mokgwa wa Bophelo',

    diabetes: 'Lefu la Swikiri',
    hypertension: 'Kgatello ya Madi e Phahameng',
    asthma: 'Sefuba',
    heartDisease: 'Lefu la Pelo',
    epilepsy: 'Tswekere',
    arthritis: 'Ho ruruhela ha Manaka',
    depression: 'Kgatello ya Maikutlo/Matshwenyeho',
    cancer: 'Kankere',
    hivAids: 'HIV/AIDS',
    tuberculosis: 'Bolwetse ba Sefuba (TB)',
    none: 'Ha ho letho',
    conditionOther: 'Tse ding',
    otherConditions: 'Ka kopo hlalosa maemo a mang',

    currentMedications: 'Dihlare tsa Hona Jwale',
    drugAllergies: 'Di-allergies tsa Dihlare',
    foodAllergies: 'Di-allergies tsa Dijo',
    noMedications: 'Ha ho dihlare tsa hona jwale',
    noDrugAllergies: 'Ha ho di-allergies tsa dihlare',
    noFoodAllergies: 'Ha ho di-allergies tsa dijo',

    previousSurgeries: 'Diketsahalo tsa Bongaka tse Fetileng (le diaterese)',
    noSurgeries: 'Ha ho diketsahalo tsa bongaka tse fetileng',
    surgeryPlaceholder: 'Mohlala, Appendectomy - Pherekhong 2020',

    familyHeartDisease: 'Lefu la Pelo',
    familyDiabetes: 'Lefu la Swikiri',
    familyCancer: 'Kankere',
    familyHypertension: 'Kgatello ya Madi e Phahameng',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Maemo a Kelello',
    noFamilyHistory: 'Ha ho nalane ya lelapa e bohlokwa',

    smoking: 'Boemo ba ho Kgotha',
    smokingNever: 'Ha ke eso',
    smokingFormer: 'Ke kile ka Kgotha',
    smokingCurrent: 'Ke a Kgotha Jwale',
    alcohol: 'Tshebediso ya Jwala',
    alcoholNever: 'Ha ke eso',
    alcoholSocial: 'Ke Nwa Sekolong',
    alcoholRegular: 'Kamehla',
    alcoholHeavy: 'Haholo',
    exercise: 'Boemo ba Boikoetliso',
    exerciseSedentary: 'Ke Dula Feela',
    exerciseLight: 'Bo Bonolo',
    exerciseModerate: 'Bo Mahareng',
    exerciseActive: 'Bo Matla',

    next: 'Tse Latelang',
    previous: 'Tse Fetileng',

    chatTitle: 'Keletso ya Ngaka ya AI',
    chatSubtitle: 'Hlalosa matshwao a hao',
    typeMessage: 'Ngola molaetsa wa hao...',
    send: 'Romela',

    vitalsTitle: 'Matshwao a Bophelo',
    bloodPressure: 'Kgatello ya Madi',
    temperature: 'Themperetjha',
    weight: 'Boima',
    height: 'Bophahamo',

    bloodTestsTitle: 'Diteko tsa Madi',
    diagnosisTitle: 'Tlhahlobo',
    virtualDoctorTitle: 'Ngaka ya Boikhethelo',
    paymentTitle: 'Tefo',

    loading: 'E a Laisa...',
    submit: 'Romela',
    cancel: 'Hlakola',
    sessionTimeout: 'Nako ya Seshen e Fedile',
    sessionTimeoutMessage: 'Seshen ya hao e tla fela ka metsotso e 2 ka lebaka la ho se sebetse.',
  },

  tn: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Keletso ya Gago ya Botsogo 24/7',
    selectLanguage: 'Tlhopha Puo ya Gago',
    startConsultation: 'Simolola Keletso',
    fastLabel: 'Ka Bonako',
    fastDesc: 'Keletso ya metsotso e 15',
    privateLabel: 'Sephiri',
    privateDesc: 'E sephiri & e sireletsegileng',
    professionalLabel: 'Seporofešenale',
    professionalDesc: 'AI + Dingaka tsa mmatota',

    popiaTitle: 'Tsebiso ya Sephiri le Tshireletso ya Tshedimosetso',
    popiaContent: 'Go ya ka Molao wa Tshireletso ya Tshedimosetso ya Motho ka Noši (POPIA), re kgoboketsa le go dirisa tshedimosetso ya gago ya botsogo ya motho ka noši fela ka maikemisetso a go go naya ditirelo tsa keletso ya kalafi. Tshedimosetso ya gago e tla bolokwa ka tsela e e sireletsegileng, e bolokwe e le sephiri, mme ga e kitla e abelwa batho ba bangwe kwa ntle ga tumelelo ya gago e e tlhamaletseng. O na le tshwanelo ya go fitlhelela, go baakanya, kgotsa go kopa go phimolwa ga tshedimosetso ya gago ya motho ka noši ka nako nngwe le nngwe. Ka go tswelela pele, o amogela gore o badile le go tlhaloganya tsebiso e mme o dumelana le kgobokanyo le ts\'ebetso ya tshedimosetso ya gago ya motho ka noši jaaka go tlhalositswe.',
    acceptTerms: 'Ke a Amogela - Tswelela Pele',
    decline: 'Ke a Gana',

    registrationTitle: 'Kwadiso ya Molwetse',
    fullName: 'Leina le le Tletseng',
    idNumber: 'Nomoro ya Boitshupo',
    passportNumber: 'Nomoro ya Phasepoto',
    dateOfBirth: 'Letlha la Masalo',
    gender: 'Bong',
    male: 'Monna',
    female: 'Mosadi',
    genderOther: 'Sengwe',
    contactNumber: 'Nomoro ya Mogala',
    emailAddress: 'Aterese ya Imeili',
    continue: 'Tswelela Pele',
    back: 'Morago',

    medicalHistoryTitle: 'Histori ya Kalafi',
    existingConditions: 'Maemo a Kalafi a a Leng Teng',
    medicationsAllergies: 'Dihlare le Di-allergies',
    surgicalHistory: 'Histori ya Dikgato tsa Kalafi',
    familyHistory: 'Histori ya Kalafi ya Losika',
    lifestyle: 'Tshedimosetso ya Mokgwa wa Botshelo',

    diabetes: 'Bolwetse jwa Sukiri',
    hypertension: 'Kgatelelo ya Madi e e Kwa Godimo',
    asthma: 'Sefuba',
    heartDisease: 'Bolwetse jwa Pelo',
    epilepsy: 'Tswekere',
    arthritis: 'Bohloko jwa Marapo',
    depression: 'Tlhobogo/Tlhobaelo',
    cancer: 'Kankere',
    hivAids: 'HIV/AIDS',
    tuberculosis: 'Bolwetse jwa Sefuba (TB)',
    none: 'Ga go na sepe',
    conditionOther: 'Sengwe',
    otherConditions: 'Ke kopa o tlhalosetse maemo a mangwe',

    currentMedications: 'Dihlare tsa Jaanong',
    drugAllergies: 'Di-allergies tsa Dihlare',
    foodAllergies: 'Di-allergies tsa Dijo',
    noMedications: 'Ga go na dihlare tsa jaanong',
    noDrugAllergies: 'Ga go na di-allergies tsa dihlare',
    noFoodAllergies: 'Ga go na di-allergies tsa dijo',

    previousSurgeries: 'Dikgato tsa Kalafi tsa Pele (le di-aterese)',
    noSurgeries: 'Ga go na dikgato tsa kalafi tsa pele',
    surgeryPlaceholder: 'Sekai, Appendectomy - Pherekgong 2020',

    familyHeartDisease: 'Bolwetse jwa Pelo',
    familyDiabetes: 'Bolwetse jwa Sukiri',
    familyCancer: 'Kankere',
    familyHypertension: 'Kgatelelo ya Madi e e Kwa Godimo',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Maemo a Kelelo',
    noFamilyHistory: 'Ga go na histori ya losika e e botlhokwa',

    smoking: 'Maemo a go Kgoga',
    smokingNever: 'Ga ke ise',
    smokingFormer: 'Ke kile ka Kgoga',
    smokingCurrent: 'Ke a Kgoga Jaanong',
    alcohol: 'Go Nwa Bojalwa',
    alcoholNever: 'Ga ke ise',
    alcoholSocial: 'Ke Nwa Fa Sekoting',
    alcoholRegular: 'Gangwe le gape',
    alcoholHeavy: 'Thata',
    exercise: 'Boemo jwa Boikoetliso',
    exerciseSedentary: 'Ke Dutse Feela',
    exerciseLight: 'Bo Bonolo',
    exerciseModerate: 'Bo Mahareng',
    exerciseActive: 'Bo Matla',

    next: 'Se se Latelang',
    previous: 'Se se Fetileng',

    chatTitle: 'Keletso ya Ngaka ya AI',
    chatSubtitle: 'Tlhalosa matshwao a gago',
    typeMessage: 'Kwala molaetsa wa gago...',
    send: 'Romela',

    vitalsTitle: 'Matshwao a Botshelo',
    bloodPressure: 'Kgatelelo ya Madi',
    temperature: 'Themperetšha',
    weight: 'Boima',
    height: 'Bophagamo',

    bloodTestsTitle: 'Diteko tsa Madi',
    diagnosisTitle: 'Tlhatlhobo',
    virtualDoctorTitle: 'Ngaka ya Boikgethelo',
    paymentTitle: 'Tuelo',

    loading: 'E a Laisa...',
    submit: 'Romela',
    cancel: 'Khansela',
    sessionTimeout: 'Nako ya Seshen e Fedile',
    sessionTimeoutMessage: 'Seshen ya gago e tla fela ka metsotso e 2 ka ntlha ya go se dire sepe.',
  },

  nso: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Keletšo ya Gago ya Maphelo 24/7',
    selectLanguage: 'Kgetha Polelo ya Gago',
    startConsultation: 'Thoma Keletšo',
    fastLabel: 'Ka Pela',
    fastDesc: 'Keletšo ya metsotso e 15',
    privateLabel: 'Sephiri',
    privateDesc: 'E sephiri & e šireleditšwe',
    professionalLabel: 'Seporofešenale',
    professionalDesc: 'AI + Dingaka tša mmatota',

    popiaTitle: 'Tsebišo ya Sephiri le Tšhireletšo ya Tshedimošo',
    popiaContent: 'Go ya ka Molao wa Tšhireletšo ya Tshedimošo ya Motho ka Noši (POPIA), re kgoboketša le go šomiša tshedimošo ya gago ya maphelo ya motho ka noši fela ka maikemišetšo a go go fa ditirelo tša keletšo ya kalafi. Tshedimošo ya gago e tla bolokwa ka tsela ye e šireleditšwego, e bolokwe e le sephiri, gomme ga e kitla e abelwa batho ba bangwe ntle le tumelelo ya gago ye e utollotšego. O na le tokelo ya go hwetša, go lokiša, goba go kgopela go phimolwa ga tshedimošo ya gago ya motho ka noši ka nako efe goba efe. Ka go tšwela pele, o amogela gore o badile le go kwešiša tsebišo ye gomme o dumelelana le kgobokanyo le tshepedišo ya tshedimošo ya gago ya motho ka noši bjalo ka ge go hlalositswe.',
    acceptTerms: 'Ke a Amogela - Tšwela Pele',
    decline: 'Ke a Gana',

    registrationTitle: 'Ngwadišo ya Molwetši',
    fullName: 'Leina le le Feletšego',
    idNumber: 'Nomoro ya Boitshupo',
    passportNumber: 'Nomoro ya Phasepoto',
    dateOfBirth: 'Letšatši la Matswalo',
    gender: 'Bong',
    male: 'Monna',
    female: 'Mosadi',
    genderOther: 'Sengwe',
    contactNumber: 'Nomoro ya Mogala',
    emailAddress: 'Aterese ya Imeili',
    continue: 'Tšwela Pele',
    back: 'Morago',

    medicalHistoryTitle: 'Histori ya Kalafi',
    existingConditions: 'Maemo a Kalafi a a Lego Gona',
    medicationsAllergies: 'Dihlare le Di-allergies',
    surgicalHistory: 'Histori ya Dikgato tša Kalafi',
    familyHistory: 'Histori ya Kalafi ya Losika',
    lifestyle: 'Tshedimošo ya Mokgwa wa Botshelo',

    diabetes: 'Bolwetši bja Swikiri',
    hypertension: 'Kgatelelo ya Madi e e Phagamego',
    asthma: 'Sefuba',
    heartDisease: 'Bolwetši bja Pelo',
    epilepsy: 'Tšwekere',
    arthritis: 'Bohloko bja Merapo',
    depression: 'Tlhobogo/Tlhobaelo',
    cancer: 'Kankere',
    hivAids: 'HIV/AIDS',
    tuberculosis: 'Bolwetši bja Sefuba (TB)',
    none: 'Ga go na sepe',
    conditionOther: 'Sengwe',
    otherConditions: 'Ke kgopela o hlalose maemo a mangwe',

    currentMedications: 'Dihlare tša Bjale',
    drugAllergies: 'Di-allergies tša Dihlare',
    foodAllergies: 'Di-allergies tša Dijo',
    noMedications: 'Ga go na dihlare tša bjale',
    noDrugAllergies: 'Ga go na di-allergies tša dihlare',
    noFoodAllergies: 'Ga go na di-allergies tša dijo',

    previousSurgeries: 'Dikgato tša Kalafi tša Pele (le di-aterese)',
    noSurgeries: 'Ga go na dikgato tša kalafi tša pele',
    surgeryPlaceholder: 'Mohlala, Appendectomy - Pherekgong 2020',

    familyHeartDisease: 'Bolwetši bja Pelo',
    familyDiabetes: 'Bolwetši bja Swikiri',
    familyCancer: 'Kankere',
    familyHypertension: 'Kgatelelo ya Madi e e Phagamego',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Maemo a Kelelo',
    noFamilyHistory: 'Ga go na histori ya losika ye botlhokwa',

    smoking: 'Maemo a go Kgoga',
    smokingNever: 'Ga ke ise',
    smokingFormer: 'Ke kile ka Kgoga',
    smokingCurrent: 'Ke a Kgoga Bjale',
    alcohol: 'Go Nwa Bjalwa',
    alcoholNever: 'Ga ke ise',
    alcoholSocial: 'Ke Nwa Ge ke Sekoting',
    alcoholRegular: 'Gangwe le gape',
    alcoholHeavy: 'Kudu',
    exercise: 'Boemo bja Boikoetlišo',
    exerciseSedentary: 'Ke Dutše Fela',
    exerciseLight: 'Bo Bonolo',
    exerciseModerate: 'Bo Mahareng',
    exerciseActive: 'Bo Maatla',

    next: 'Se se Latelago',
    previous: 'Se se Fetilego',

    chatTitle: 'Keletšo ya Ngaka ya AI',
    chatSubtitle: 'Hlaloša matšhwao a gago',
    typeMessage: 'Ngwala molaetša wa gago...',
    send: 'Romela',

    vitalsTitle: 'Matšhwao a Botshelo',
    bloodPressure: 'Kgatelelo ya Madi',
    temperature: 'Themperetšha',
    weight: 'Boima',
    height: 'Bophagamo',

    bloodTestsTitle: 'Diteko tša Madi',
    diagnosisTitle: 'Tlhatlhobo',
    virtualDoctorTitle: 'Ngaka ya Boikgetho',
    paymentTitle: 'Tefelo',

    loading: 'E a Laisa...',
    submit: 'Romela',
    cancel: 'Khansela',
    sessionTimeout: 'Nako ya Seshen e Fedile',
    sessionTimeoutMessage: 'Seshen ya gago e tla fela ka metsotso e 2 ka lebaka la go se dire selo.',
  },

  ts: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Vulavulelo bya Wena bya Rihanyu 24/7',
    selectLanguage: 'Hlawula Ririmi ra Wena',
    startConsultation: 'Sungula Vulavulelo',
    fastLabel: 'Hi Xihatla',
    fastDesc: 'Vulavulelo bya timinete ta 15',
    privateLabel: 'Swa leHansi',
    privateDesc: 'Swa le hansi & swa sirhelekile',
    professionalLabel: 'Vuprofexinali',
    professionalDesc: 'AI + Vadokodela va nkoka',

    popiaTitle: 'Nkandziyiso wa Swa le Hansi na Vuhlayiseki bya Mahungu',
    popiaContent: 'Hi ku ya hi Nawu wa Vuhlayiseki bya Mahungu ya Munhu hi Xiyexe (POPIA), hi hlengeleta naswona hi tirhisa mahungu ya wena ya rihanyu ya munhu hi xiyexe ntsena hi xikongomelo xa ku ku nyika vukorhokeri bya vulavulelo bya rihanyu. Mahungu ya wena ma ta hlayisiwa hi ndlela ya vuhlayiseki, ma hlayisiwa ma ri swa le hansi, naswona a ma nge avelani na vaaki van\'wana handle ka mpfumelelo wa wena lowu nga erivaleni. U na ni mpfumelelo wo kota ku ma fikelela, ku ma lulamisa, kumbe ku kombela ku herisiwa ka mahungu ya wena ya munhu hi xiyexe nkarhi wun\'wana na wun\'wana. Hi ku ya emahlweni, u amukela leswaku u hlayile naswona u twisisa nkandziyiso lowu naswona u pfumela ku hlengeletiwa na ku tirhisiwa ka mahungu ya wena ya munhu hi xiyexe hi ndlela leyi hlamusiweke hakona.',
    acceptTerms: 'Ndzi Amukela - Yi Emahlweni',
    decline: 'Ndzi Ala',

    registrationTitle: 'Ngheniso wa Munhu Loyi A Kuleke',
    fullName: 'Vito ra Ku Helelela',
    idNumber: 'Nomboro ya Xitupa',
    passportNumber: 'Nomboro ya Phasipoto',
    dateOfBirth: 'Suku ra Vuxiwa',
    gender: 'Ndzimi',
    male: 'Wanuna',
    female: 'Wansati',
    genderOther: 'Xin\'wana',
    contactNumber: 'Nomboro ya Riqingho',
    emailAddress: 'Adirese ya Imeyili',
    continue: 'Yi Emahlweni',
    back: 'Emuva',

    medicalHistoryTitle: 'Matimu ya Rihanyu',
    existingConditions: 'Minkarhi ya Rihanyu leyi Nga Kona',
    medicationsAllergies: 'Mirhi na Ti-allergies',
    surgicalHistory: 'Matimu ya Minongonoko',
    familyHistory: 'Matimu ya Rihanyu ya Ndyangu',
    lifestyle: 'Mahungu ya Ndlela ya Vutomi',

    diabetes: 'Vuvabyi bya Swikiri',
    hypertension: 'Nhlayo ya Ngati leyi Haheke',
    asthma: 'Xifuva',
    heartDisease: 'Vuvabyi bya Mbilu',
    epilepsy: 'Tswekere',
    arthritis: 'Vuvabyi bya Swirhambu',
    depression: 'Ku Khathazeka/Ku Vilela',
    cancer: 'Kankere',
    hivAids: 'HIV/AIDS',
    tuberculosis: 'Vuvabyi bya Xifuva (TB)',
    none: 'A ku ri na',
    conditionOther: 'Xin\'wana',
    otherConditions: 'Kombela hlamusela minkarhi yin\'wana',

    currentMedications: 'Mirhi ya Sweswi',
    drugAllergies: 'Ti-allergies ta Mirhi',
    foodAllergies: 'Ti-allergies ta Swakudya',
    noMedications: 'A ku ri na mirhi ya sweswi',
    noDrugAllergies: 'A ku ri na ti-allergies ta mirhi',
    noFoodAllergies: 'A ku ri na ti-allergies ta swakudya',

    previousSurgeries: 'Minongonoko ya Khale (na ti-adirese)',
    noSurgeries: 'A ku ri na minongonoko ya khale',
    surgeryPlaceholder: 'Xik., Appendectomy - Sungulampala 2020',

    familyHeartDisease: 'Vuvabyi bya Mbilu',
    familyDiabetes: 'Vuvabyi bya Swikiri',
    familyCancer: 'Kankere',
    familyHypertension: 'Nhlayo ya Ngati leyi Haheke',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Minkarhi ya Miehleketo',
    noFamilyHistory: 'A ku ri na matimu ya ndyangu lama nga na nkoka',

    smoking: 'Xiyimo xa ku Koka',
    smokingNever: 'A ndzi nga si',
    smokingFormer: 'Ndzi kile ndzi Koka',
    smokingCurrent: 'Ndzi a Koka Sweswi',
    alcohol: 'Ku Nwa Byala',
    alcoholNever: 'A ndzi nga si',
    alcoholSocial: 'Ndzi Nwa Loko ndzi le Nhlanganweni',
    alcoholRegular: 'Minkarhi hinkwayo',
    alcoholHeavy: 'Swinene',
    exercise: 'Xiyimo xa Vuleteri',
    exerciseSedentary: 'Ndzi Tshama Ntsena',
    exerciseLight: 'Xa Olova',
    exerciseModerate: 'Xa le Xikarhi',
    exerciseActive: 'Xa Matimba',

    next: 'Lexi Landzelaka',
    previous: 'Lexi Hundzeke',

    chatTitle: 'Vulavulelo bya Dokodela wa AI',
    chatSubtitle: 'Hlamusela swikombiso swa wena',
    typeMessage: 'Tsala rungula ra wena...',
    send: 'Rhumela',

    vitalsTitle: 'Swikombiso swa Vutomi',
    bloodPressure: 'Nhlayo ya Ngati',
    temperature: 'Xiyimo xa Ku Hisa',
    weight: 'Ndzito',
    height: 'Ku Luga',

    bloodTestsTitle: 'Swikambelo swa Ngati',
    diagnosisTitle: 'Ku Lavisisa',
    virtualDoctorTitle: 'Dokodela wa Virtual',
    paymentTitle: 'Ku Hakela',

    loading: 'E a Layicha...',
    submit: 'Rhumela',
    cancel: 'Kandziyisa',
    sessionTimeout: 'Nkarhi wa Session wu Helerile',
    sessionTimeoutMessage: 'Session ya wena yi ta hela ka timinete ta 2 hikwalaho ka ku nga tirhi.',
  },

  ss: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Sicetfo Sakho Sempilo 24/7',
    selectLanguage: 'Khetsa Lulwimi Lwakho',
    startConsultation: 'Cala Sicetfo',
    fastLabel: 'Ngekushesha',
    fastDesc: 'Sicetfo semaminithi la-15',
    privateLabel: 'Buyimfihlo',
    privateDesc: 'Buyimfihlo & kuphephile',
    professionalLabel: 'Siphrofeshenali',
    professionalDesc: 'AI + Boludokotela bangempela',

    popiaTitle: 'Satiso Sebuyimfihlo Nekuvikeleka Kwelwati',
    popiaContent: 'Ngekwemtsetfo wekuvikeleka Kwelwati Lwemuntfu Ngamunye (POPIA), sibuta futsi sisebentise lwati lwakho lwempilo lwemuntfu ngamunye kuphela ngenhloso yekweniketa lusito lwekwelulekwa kwetinhlelo tekwelapha. Lwati lwakho luta gciniwa luphephile, lugcinwe luyimfihlo, futsi alusoze lwabelane netinye tingutana ngaphandle kwemvumo yakho lecace kakhulu. Unemalungelo ekufinyelela, kulungisa, nobe kucela kususiwa kwelwati lwakho lwemuntfu ngamunye noma ninganini. Ngekuchubeka, wamukela kutsi ufundze futsi wacondza lesatiso futsi wemukela kubuthwa nekucutfungulwa kwelwati lwakho lwemuntfu ngamunye njengobe kuchatiwe.',
    acceptTerms: 'Ngiyemukela - Chubeka',
    decline: 'Ngiyala',

    registrationTitle: 'Kubhaliswa Kwesiguli',
    fullName: 'Libito Leliphelele',
    idNumber: 'Inombolo Yesitupa',
    passportNumber: 'Inombolo Yephaseputhi',
    dateOfBirth: 'Lilanga Lekutalwa',
    gender: 'Buntfu',
    male: 'Lindvodza',
    female: 'Linsikati',
    genderOther: 'Lokuncane',
    contactNumber: 'Inombolo Yekuxhumana',
    emailAddress: 'Ikheli Lema-imeyili',
    continue: 'Chubeka',
    back: 'Emuva',

    medicalHistoryTitle: 'Umlando Wetinhlelo Tekwelapha',
    existingConditions: 'Timo Tetinhlelo Tekwelapha Letikhona',
    medicationsAllergies: 'Imitsi Nema-allergies',
    surgicalHistory: 'Umlando Wekuhlinzwa',
    familyHistory: 'Umlando Wetinhlelo Tekwelapha Wemndeni',
    lifestyle: 'Lwati Lwendlela Yekuphila',

    diabetes: 'Sifo Seshukela',
    hypertension: 'Umfutfo Wegati Lophakeme',
    asthma: 'I-Asthma',
    heartDisease: 'Sifo Senhlitiyo',
    epilepsy: 'I-Epilepsy',
    arthritis: 'I-Arthritis',
    depression: 'Kucindezeleka/Kukhatsateka',
    cancer: 'Umdlavuza',
    hivAids: 'I-HIV/AIDS',
    tuberculosis: 'Sifo Sefuba (TB)',
    none: 'Akukho',
    conditionOther: 'Lokuncane',
    otherConditions: 'Sicela ucacise letinye timo',

    currentMedications: 'Imitsi Yamanje',
    drugAllergies: 'Ema-allergies Etitfutfuko',
    foodAllergies: 'Ema-allergies Ekudla',
    noMedications: 'Ayikho imitsi yamanje',
    noDrugAllergies: 'Awekho ema-allergies etitfutfuko',
    noFoodAllergies: 'Awekho ema-allergies ekudla',

    previousSurgeries: 'Kuhlinzwa Kwangaphambilini (netilanga)',
    noSurgeries: 'Akukho kuhlinzwa kwangaphambilini',
    surgeryPlaceholder: 'Sib., I-Appendectomy - Bhimbidvwane 2020',

    familyHeartDisease: 'Sifo Senhlitiyo',
    familyDiabetes: 'Sifo Seshukela',
    familyCancer: 'Umdlavuza',
    familyHypertension: 'Umfutfo Wegati Lophakeme',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Timo Tekucabanga',
    noFamilyHistory: 'Awukho umlando wemndeni lobalulekile',

    smoking: 'Simo Sekubhema',
    smokingNever: 'Angikaze',
    smokingFormer: 'Bengibhema',
    smokingCurrent: 'Ngiyabhema Manje',
    alcohol: 'Kuphuza Utjwala',
    alcoholNever: 'Angikaze',
    alcoholSocial: 'Ngiphuza Lapho Ngisemhlanganweni',
    alcoholRegular: 'Njalo',
    alcoholHeavy: 'Kakhulu',
    exercise: 'Lizinga Lekujama',
    exerciseSedentary: 'Ngihlala Nje',
    exerciseLight: 'Kulula',
    exerciseModerate: 'Kuphakati',
    exerciseActive: 'Kusebenta',

    next: 'Lokulandelako',
    previous: 'Lokwedlule',

    chatTitle: 'Sicetfo Saludokotela La-AI',
    chatSubtitle: 'Chaza tincumo takho',
    typeMessage: 'Tfayipha umlayeto wakho...',
    send: 'Tfumela',

    vitalsTitle: 'Tincumo Tekuphila',
    bloodPressure: 'Umfutfo Wegati',
    temperature: 'Lizinga Lekushisa',
    weight: 'Sitsindvo',
    height: 'Bude',

    bloodTestsTitle: 'Kuhlolwa Kwegati',
    diagnosisTitle: 'Kuhlola',
    virtualDoctorTitle: 'Ludokotela Lwa-virtual',
    paymentTitle: 'Kukhokha',

    loading: 'Kuyalayisha...',
    submit: 'Tfumela',
    cancel: 'Khansela',
    sessionTimeout: 'Sikhatsi Seseshini Siphelelwe',
    sessionTimeoutMessage: 'Seshini yakho itaphela sikhatsi ngemaminithi lama-2 ngenxa yekungasebenti.',
  },

  ve: {
    welcomeTitle: 'AI Medical Kiosk',
    welcomeSubtitle: 'Themendelo yashu ya Phuluso 24/7',
    selectLanguage: 'Nangani Luambo Lwashu',
    startConsultation: 'Thomani Themendelo',
    fastLabel: 'Nga u Tavhanya',
    fastDesc: 'Themendelo ya minithi ya 15',
    privateLabel: 'Vhusiri',
    privateDesc: 'Vhusiri & u tsireledza',
    professionalLabel: 'Vhuprofeshenala',
    professionalDesc: 'AI + Vhadokotela vha nnyi',

    popiaTitle: 'Thembulelano ya Vhusiri na Tsireledzo ya Data',
    popiaContent: 'U ya nga Mulayo wa Tsireledzo ya Mafhungo a Vhathu (POPIA), ri khou kuvhanganya na u shumisa mafhungo ashu a phuluso a vhathu nga u tou itela thaidzo ya u ni fa tshumelo ya themendelo ya zwikhwaḓo. Mafhungo ashu a ḓo tshiredzwa ngoho, a tshiredzwa a ri vhusiri, nahone a si nga ni a tshimbidzani na vhaṅwe vhathu nṱha ha uri ni tshi ri mini kha vhubvumeleli hashu hu tshe. Ni na pfanelo ya u swikela, u lugisela, kana u humbela u bviswaho ha mafhungo ashu a vhathu tshifhinga tshinwe na tshinwe. Nga u bvela phanḓa, ni a tenda uri no vhala nahone no pfesesa thembulelano hedzi nahone ni a tenda kuvhanganywa na u shunywa ha mafhungo ashu a vhathu sa zwo bviswaho.',
    acceptTerms: 'Ndi a Tenda - Bvelani Phanḓa',
    decline: 'Ndi a Hana',

    registrationTitle: 'U Ṅwalisa Muḓiwana',
    fullName: 'Dzina ḽa Vhuthu',
    idNumber: 'Nomboro ya Vhuṱhoho',
    passportNumber: 'Nomboro ya Phasipoto',
    dateOfBirth: 'Ḓuvha ḽa Ubveledzo',
    gender: 'Mbeu',
    male: 'Munna',
    female: 'Musadzi',
    genderOther: 'Zwinwe',
    contactNumber: 'Nomboro ya Vhuḓifhinduleli',
    emailAddress: 'Adirese ya Imeili',
    continue: 'Bvelani Phanḓa',
    back: 'Murahu',

    medicalHistoryTitle: 'Mafhungo a Zwikhwaḓo',
    existingConditions: 'Maimo a Zwikhwaḓo a hone',
    medicationsAllergies: 'Mishonga na Tshiṱalele',
    surgicalHistory: 'Mafhungo a u Alusiwa',
    familyHistory: 'Mafhungo a Zwikhwaḓo a Muṱa',
    lifestyle: 'Mafhungo a Tshenzhemo ya Vhutshilo',

    diabetes: 'Ḓuvha ḽa Tshikele',
    hypertension: 'Khathulo ya Ṅwali i re nṱha',
    asthma: 'I-Asthma',
    heartDisease: 'Ḓuvha ḽa Vhuḓivhe',
    epilepsy: 'I-Epilepsy',
    arthritis: 'I-Arthritis',
    depression: 'U vhonala nda u lwala/U vhofha',
    cancer: 'Khantshere',
    hivAids: 'I-HIV/AIDS',
    tuberculosis: 'Ḓuvha ḽa Phumu (TB)',
    none: 'A huna',
    conditionOther: 'Zwinwe',
    otherConditions: 'Ri humbela ni bvisele maimo maṅwe',

    currentMedications: 'Mishonga ya Zwino',
    drugAllergies: 'Tshiṱalele tsha Mishonga',
    foodAllergies: 'Tshiṱalele tsha Zwiḽa',
    noMedications: 'A huna mishonga ya zwino',
    noDrugAllergies: 'A huna tshiṱalele tsha mishonga',
    noFoodAllergies: 'A huna tshiṱalele tsha zwiḽa',

    previousSurgeries: 'U Alusiwa ha Zwithu (na dziḓuvha)',
    noSurgeries: 'A huna u alusiwa ha zwithu',
    surgeryPlaceholder: 'Tsumbo, Appendectomy - Phando 2020',

    familyHeartDisease: 'Ḓuvha ḽa Vhuḓivhe',
    familyDiabetes: 'Ḓuvha ḽa Tshikele',
    familyCancer: 'Khantshere',
    familyHypertension: 'Khathulo ya Ṅwali i re nṱha',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Maimo a Pfungulo',
    noFamilyHistory: 'A huna mafhungo a muṱa a re khagala',

    smoking: 'Maimo a u Fuwa',
    smokingNever: 'A thi fuwa',
    smokingFormer: 'Ndo fuwa',
    smokingCurrent: 'Ndi khou Fuwa Zwino',
    alcohol: 'U Nwa Doro',
    alcoholNever: 'A thi nwa',
    alcoholSocial: 'Ndi a Nwa Vhukati ha Vhathu',
    alcoholRegular: 'Tshifhinga tshinwe na tshinwe',
    alcoholHeavy: 'Hune',
    exercise: 'Vhushaka ha U ita Muvhili',
    exerciseSedentary: 'Ndi khou Dzula Fhedzi',
    exerciseLight: 'Zwa u Pfufhiwa',
    exerciseModerate: 'Vhukati',
    exerciseActive: 'U shuma',

    next: 'Zwi tevhelaho',
    previous: 'Zwo fhirelaho',

    chatTitle: 'Themendelo ya Dokotela wa AI',
    chatSubtitle: 'Bviselani tshiga dzashu',
    typeMessage: 'Thaibani mulaedza washu...',
    send: 'Rumelani',

    vitalsTitle: 'Tshiga dza Vhutshilo',
    bloodPressure: 'Khathulo ya Ṅwali',
    temperature: 'Vhushaka ha Fhisa',
    weight: 'Vhurema',
    height: 'Vhulapfu',

    bloodTestsTitle: 'Kumbelo dza Ṅwali',
    diagnosisTitle: 'U Sedza',
    virtualDoctorTitle: 'Dokotela wa Virtual',
    paymentTitle: 'U hakela',

    loading: 'Zwi khou Longwa...',
    submit: 'Rumelani',
    cancel: 'Khanselani',
    sessionTimeout: 'Tshifhinga tsha Seshin tsho fhela',
    sessionTimeoutMessage: 'Seshin yashu i ḓo fhela nga minithi ya 2 nga nnḓa ha u shuma.',
  },

  nr: {
    welcomeTitle: 'I-AI Medical Kiosk',
    welcomeSubtitle: 'Iseluleko Sakho Sempilo 24/7',
    selectLanguage: 'Khetha Ilimi Lakho',
    startConsultation: 'Qalisa Iseluleko',
    fastLabel: 'Ngokuphangisa',
    fastDesc: 'Iseluleko semizuzu eli-15',
    privateLabel: 'Yimfihlo',
    privateDesc: 'Yimfihlo & yovikelekele',
    professionalLabel: 'Siphrofeshinali',
    professionalDesc: 'I-AI + Ngabelaphi bangempela',

    popiaTitle: 'Isaziso Yobumfihlo Nokuvikelwa Kwedatha',
    popiaContent: 'Ngokwemtsetfo Wokuvikelwa Kwelwazi Lomuntfu (POPIA), siqoqa futhi sibhekane nelwazi lakho lwempilo lomuntfu ngamunye kuphela ngenhloso yokuniketa usebenzo lweseluleko yemithi. Idatha yakho izogcinwa iphephile, igcinwe iyimfihlo, futhi ayisoze yabelane nezinye izinhlelo ngaphandle kwemvumo yakho ecace kakhulu. Unelungelo lokufinyelela, ukulungisa, noma ukucela ukusulwa kwelwazi lakho lomuntfu ngamunye nganoma yisiphi isikhathi. Ngokuqhubeka, uyavuma ukuthi ufundile futhi uyaqonda lesaziso futhi uvuma ukuqoqwa nokubhekana kwelwazi lakho lomuntfu ngamunye njengoba kuchaziwe.',
    acceptTerms: 'Ngiyavuma - Qhubeka',
    decline: 'Ngiyala',

    registrationTitle: 'Ukubhalisa Kwesiguli',
    fullName: 'Ibizo Eligcwele',
    idNumber: 'Inombolo Yesazisi',
    passportNumber: 'Inombolo Yephasiphothi',
    dateOfBirth: 'Ilanga Lokuzalwa',
    gender: 'Ubulili',
    male: 'Umlisa',
    female: 'Umfazi',
    genderOther: 'Okunye',
    contactNumber: 'Inombolo Yokuxhumana',
    emailAddress: 'Ikheli Le-imeyili',
    continue: 'Qhubeka',
    back: 'Emuva',

    medicalHistoryTitle: 'Umlando Wemithi',
    existingConditions: 'Izimo Zemithi Ezikhona',
    medicationsAllergies: 'Imithi Ne-allergies',
    surgicalHistory: 'Umlando Wokuhlinzwa',
    familyHistory: 'Umlando Wemithi Womndeni',
    lifestyle: 'Ulwazi Lwendlela Yokuphila',

    diabetes: 'Isifo Sikashukela',
    hypertension: 'Umfutho Wegazi Ophakeme',
    asthma: 'I-Asthma',
    heartDisease: 'Isifo Senhliziyo',
    epilepsy: 'I-Epilepsy',
    arthritis: 'I-Arthritis',
    depression: 'Ukucindezeleka/Ukukhathazeka',
    cancer: 'Umdlavuza',
    hivAids: 'I-HIV/AIDS',
    tuberculosis: 'Isifo Sefuba (TB)',
    none: 'Lutho',
    conditionOther: 'Okunye',
    otherConditions: 'Sicela ucacise ezinye izimo',

    currentMedications: 'Imithi Yamanje',
    drugAllergies: 'I-allergies Yemithi',
    foodAllergies: 'I-allergies Yokudla',
    noMedications: 'Ayikho imithi yamanje',
    noDrugAllergies: 'Ayikho i-allergies yemithi',
    noFoodAllergies: 'Ayikho i-allergies yokudla',

    previousSurgeries: 'Ukuhlinzwa Kwangaphambili (namalanga)',
    noSurgeries: 'Akukho ukuhlinzwa kwangaphambili',
    surgeryPlaceholder: 'Isib., I-Appendectomy - UMasingane 2020',

    familyHeartDisease: 'Isifo Senhliziyo',
    familyDiabetes: 'Isifo Sikashukela',
    familyCancer: 'Umdlavuza',
    familyHypertension: 'Umfutho Wegazi Ophakeme',
    familyStroke: 'Stroke',
    familyMentalHealth: 'Izimo Zengqondo',
    noFamilyHistory: 'Awukho umlando womndeni obalulekile',

    smoking: 'Isimo Sokubhema',
    smokingNever: 'Angikaze',
    smokingFormer: 'Bengibhema',
    smokingCurrent: 'Ngiyabhema Manje',
    alcohol: 'Ukuphuza Utshwala',
    alcoholNever: 'Angikaze',
    alcoholSocial: 'Ngiphuza Lapho Ngisemhlanganweni',
    alcoholRegular: 'Njalo',
    alcoholHeavy: 'Kakhulu',
    exercise: 'Izinga Lokuvivinya Umzimba',
    exerciseSedentary: 'Ngihlala Nje',
    exerciseLight: 'Okulula',
    exerciseModerate: 'Okuphakathi',
    exerciseActive: 'Okusebenzayo',

    next: 'Okulandelayo',
    previous: 'Okwedlule',

    chatTitle: 'Iseluleko Ngabelaphi We-AI',
    chatSubtitle: 'Chaza izimpawu zakho',
    typeMessage: 'Thayipha umlayezo wakho...',
    send: 'Thumela',

    vitalsTitle: 'Izimpawu Zokuphila',
    bloodPressure: 'Umfutho Wegazi',
    temperature: 'Izinga Lokushisa',
    weight: 'Isisindo',
    height: 'Ubude',

    bloodTestsTitle: 'Ukuhlolwa Kwegazi',
    diagnosisTitle: 'Ukuhlolwa',
    virtualDoctorTitle: 'Ungabelaphi Bobunikazi',
    paymentTitle: 'Inkokhelo',

    loading: 'Iyalayisha...',
    submit: 'Thumela',
    cancel: 'Khansela',
    sessionTimeout: 'Isikhathi Seseshini Siphelelwe',
    sessionTimeoutMessage: 'Iseshini yakho izophelelwa isikhathi emizuzwini emi-2 ngenxa yokungasebenzi.',
  },
};

export function useTranslation(language: Language): Translations {
  return translations[language] || translations.en;
}
