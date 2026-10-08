import type {Theme} from '../data';

/** Four independent sample service practices. Fictional copy, no implied license or medical efficacy. */
export interface HelperPractice {
 specialty:string; eyebrow:string; hero:string; intro:string; promise:string;
 reasonsTitle:string; reasons:string[]; serviceTitle:string;
 services:[{title:string;description:string;meta:string},{title:string;description:string;meta:string},{title:string;description:string;meta:string}];
 processTitle:string; process:[{title:string;description:string},{title:string;description:string},{title:string;description:string}];
 aboutTitle:string; about:string; practiceLabel:string; concepts:string[];
 suitable:string[]; notSuitable:string[]; fitNotice:string;
 faqs:[{question:string;answer:string},{question:string;answer:string},{question:string;answer:string}];
 bookingTitle:string; bookingDescription:string; terms:string; visitIntro:string; pricingNote:string;
}
export const helperPractice:Record<Theme,HelperPractice>={
  paper:{
    specialty:'身體工作',eyebrow:'BODYWORK · SOMATIC AWARENESS',hero:'從身體的感覺開始，找回與自己的連結。',
    intro:'透過觸碰、呼吸與身體覺察，留意長時間累積的緊繃與姿勢習慣。每次工作都先討論需求、接觸範圍與身體界線。',
    promise:'不急著改變身體，而是先聽懂它正在傳遞的訊息。',reasonsTitle:'也許你正在留意這些身體訊號',
    reasons:['肩頸與背部經常緊繃，想找時間安靜地感受身體。','長時間久坐或忙碌，越來越難察覺呼吸與姿勢。','希望探索觸碰、動作與休息之間的感受。','想了解身體工作的流程、衣著與同意方式。'],
    serviceTitle:'身體工作的幾種入口',
    services:[{title:'初次身體覺察',description:'先談目前的感受、需求與身體界線，再進入適合的觀察練習。',meta:'流程示範｜時間另行設定'},{title:'一對一身體工作',description:'依當次回饋調整接觸方式、節奏與休息，不預設固定流程。',meta:'可選觸碰方式'},{title:'呼吸與伸展練習',description:'透過溫和動作觀察身體的活動範圍，建立日常覺察方法。',meta:'個人或小團體'}],
    processTitle:'第一次身體工作會怎麼進行？',process:[{title:'先了解身體狀態',description:'討論不適部位、接觸禁忌與對觸碰的偏好。'},{title:'說明流程並取得同意',description:'每項觸碰或動作都應可隨時拒絕、調整或停止。'},{title:'工作後整理感受',description:'回顧身體反應與適合帶回生活的簡單練習。'}],
    aboutTitle:'在身體工作裡，尊重界線比任何手法都重要。',about:'此處適合介紹使用的身體工作方法、實際受訓背景、是否提供觸碰與服務限制。正式上線請放真實經歷。',
    practiceLabel:'身體工作提供者（示範）',concepts:['觸碰需同意','尊重身體界線','可隨時暫停'],
    suitable:['希望探索緊繃、姿勢或呼吸感受的人','願意先確認接觸方式與自身界線的人'],
    notSuitable:['有急性傷害或需診斷治療、尚未完成醫療評估者','期待一次服務保證治癒疾病或取代醫療照護者'],
    fitNotice:'身體工作不等於醫療診斷或治療。實際禁忌與專業資格須由服務提供者清楚說明。',
    faqs:[{question:'需要脫衣服嗎？',answer:'由實際工作方式決定；事前應清楚說明衣著與接觸範圍，任何時候都可拒絕不舒服的安排。'},{question:'過程中可以說停止嗎？',answer:'可以。接觸範圍與動作都應以持續同意為前提。'},{question:'身體疼痛可以直接預約嗎？',answer:'不明原因或急性疼痛應優先就醫評估；身體工作不能取代診斷與治療。'}],
    bookingTitle:'先確認工作方式，才決定要不要預約。',bookingDescription:'了解是否採觸碰、時間、空間與個人界線；示範站尚未設定真實預約。',
    terms:'觸碰方式、衣著及取消規則須於正式網站明列。',visitIntro:'從事前說明、知情同意，到每一步的身體回饋。',pricingNote:'請設定實際場次、時長與收費。'
  },
  morning:{
    specialty:'諮商心理',eyebrow:'COUNSELING · MENTAL HEALTH',hero:'給心裡那些還說不清楚的感受，一個可以談的空間。',
    intro:'如果你正面對壓力、關係或情緒上的困擾，諮商可以是一段慢慢理解自己經驗的過程。服務資格、保密範圍與費用都應事先說明。',
    promise:'在被尊重的對話裡，找到自己的理解與選擇。',reasonsTitle:'這些議題，也許值得有個地方談談',
    reasons:['壓力與焦慮影響生活，希望理解自己正在經歷什麼。','親密關係或家庭互動反覆出現相似的困擾。','經歷轉換與失落，想整理想法與感受。','想了解心理諮商能提供什麼，以及它的界線。'],
    serviceTitle:'可依實際資格提供的諮商服務',
    services:[{title:'初次諮商說明',description:'確認需求、保密原則、服務方式與適合度。',meta:'資格與費用另行確認'},{title:'個別心理諮商',description:'在專業關係中探索情緒、壓力與人際經驗。',meta:'持續頻率依雙方討論'},{title:'心理健康資源導覽',description:'協助了解不同專業與支持資源的差異。',meta:'資訊性服務示範'}],
    processTitle:'心理諮商開始前，你可以知道的事',process:[{title:'確認專業資格與需求',description:'核對服務者是否具備所在地法律要求的專業資格。'},{title:'了解保密與同意',description:'說明保密原則、例外情況、費用、取消政策與緊急協助界線。'},{title:'開始討論合作方向',description:'依實際狀況共同釐清可行的工作目標與節奏。'}],
    aboutTitle:'專業介紹應該讓人查得到，而不只是看起來可靠。',about:'這裡適合放正式姓名、心理師證照、執登資料、專長與諮商取向。示範站不代表任何人具備心理師執照。',
    practiceLabel:'心理諮商服務示範（資格未設定）',concepts:['專業資格須核實','保密與例外','尊重個別需求'],
    suitable:['希望在專業環境討論情緒、關係與壓力議題的人','願意先了解諮商保密、費用與合作界線的人'],
    notSuitable:['目前存在立即的人身危險或急性危機，需要緊急支援者','希望透過一般網站諮詢直接取得精神疾病診斷或處方者'],
    fitNotice:'心理諮商須由符合所在地法規的合格專業人員提供；危急情況請優先使用所在地緊急資源。',
    faqs:[{question:'第一次諮商需要準備什麼？',answer:'可以先想想想談的議題；正式服務開始前，也應獲得保密、收費與權益說明。'},{question:'談過的內容會保密嗎？',answer:'專業服務者應說明保密原則及依法可能適用的例外情況，具體內容依專業規範與服務契約。'},{question:'諮商可以直接診斷或開藥嗎？',answer:'諮商、精神科診療與藥物處方的角色不同，應向具備相應資格的專業人員確認。'}],
    bookingTitle:'預約前，先確認資格與諮商說明。',bookingDescription:'諮商服務應明列合格專業人員、保密界線、費用與預約方法；此站為示範。',
    terms:'正式站須提供專業資格、保密原則及法定例外、取消與危機處理資訊。',visitIntro:'先明白權益、保密與費用，再決定是否開始諮商。',pricingNote:'諮商時長、形式及費用應由合格機構或專業人員設定。'
  },
  studio:{
    specialty:'教練',eyebrow:'COACHING · PERSONAL GROWTH',hero:'把想做的事說清楚，找到下一個可以行動的步驟。',
    intro:'教練式對話聚焦目標、選擇與行動。不是替你做決定，而是透過提問與回顧，讓你更清楚自己想往哪裡走。',
    promise:'少一些標準答案，多一些真正可以開始的行動。',reasonsTitle:'你是否正在面對這些選擇？',
    reasons:['工作或人生方向很多，卻不容易決定先走哪一步。','有想完成的計畫，希望建立合適的行動節奏。','經常埋首分析，希望有人一起整理選項。','想在轉職、創作或目標調整時獲得思考支持。'],
    serviceTitle:'以目標與行動為中心的教練服務',
    services:[{title:'探索會談',description:'釐清現況、目標與合作期待，確認教練方法是否合適。',meta:'單次｜時長待設定'},{title:'個人教練對話',description:'透過提問與反思整理目標，討論可執行的下一步。',meta:'一對一會談'},{title:'目標實踐回顧',description:'追蹤實際行動的回饋，調整策略與自我支持方式。',meta:'階段性回顧'}],
    processTitle:'教練合作怎麼開始？',process:[{title:'定義想處理的議題',description:'先確認這是目標與行動議題，而不是需要心理治療的困擾。'},{title:'討論方向與選擇',description:'運用提問、回饋與整理，而非替你給出人生答案。'},{title:'設定行動與回顧',description:'共同決定一個可實行的小步驟，下次再檢視學到什麼。'}],
    aboutTitle:'好的教練關係，把決定權留在你手上。',about:'這裡可以說明教練訓練、實務經驗、專長領域與合作倫理；若有認證，請列出可查證的發證單位。',
    practiceLabel:'個人成長教練（示範）',concepts:['目標釐清','可執行行動','回顧與調整'],
    suitable:['有目標但想釐清優先順序與下一步的人','願意在對話之間嘗試行動並回顧的人'],
    notSuitable:['需要心理疾病診斷、治療或危機處理者','期待教練代替自己做選擇或保證達成特定成果者'],
    fitNotice:'教練不取代心理諮商、醫療或法律與財務專業服務。',
    faqs:[{question:'教練和諮商有什麼不同？',answer:'教練主要聚焦目標、選擇與行動；諮商涉及心理健康專業工作，需求不同時可考慮其他專業資源。'},{question:'教練會告訴我該怎麼做嗎？',answer:'教練通常透過提問、反思與回顧協助你建立自己的判斷，而不是替你做所有決定。'},{question:'需要先有明確目標嗎？',answer:'不一定。合作起點也可能是釐清現在最重要的方向。'}],
    bookingTitle:'先談談你正在面對的選擇與目標。',bookingDescription:'了解會談方式、次數與保密約定；正式服務的預約平台尚待設定。',
    terms:'應清楚說明合作期數、取消政策、保密與教練專業界線。',visitIntro:'釐清目標、共同規劃，再從一個小行動開始。',pricingNote:'教練次數、時長與費用由正式服務者自行配置。'
  },
  botanical:{
    specialty:'靈氣',eyebrow:'REIKI · RELAXATION PRACTICE',hero:'讓自己有一段安靜的時間，回到此刻的感受。',
    intro:'靈氣可作為個人放鬆與身心覺察的體驗。這裡重視過程說明、知情同意與個人的舒適度，不宣稱能診斷、治療或保證改善疾病。',
    promise:'不用追求特別的感受，容許自己只是好好休息。',reasonsTitle:'或許你想為自己留一點空間',
    reasons:['生活節奏緊湊，想安排一段安靜休息的時間。','對靈氣體驗有好奇，但希望先知道實際會怎麼進行。','希望在安全、尊重的環境中留意自身感受。','希望清楚理解觸碰、遠距與個人信念上的選擇。'],
    serviceTitle:'了解靈氣體驗的不同方式',
    services:[{title:'靈氣體驗說明',description:'先介紹靈氣的理念、流程及服務界線，回答首次參與常見問題。',meta:'體驗前說明'},{title:'個人放鬆體驗',description:'以安靜的環境與個人意願為主，可事先討論是否採觸碰。',meta:'實際方式需另行設定'},{title:'日常覺察練習',description:'分享簡單的休息與覺察方式，讓體驗與日常生活有所連結。',meta:'練習交流'}],
    processTitle:'第一次靈氣體驗會發生什麼？',process:[{title:'先了解服務內容',description:'清楚介紹流程、時間、是否觸碰及不能取代的專業服務。'},{title:'確認舒適度與界線',description:'由參與者決定姿勢、距離與是否接受身體接觸。'},{title:'體驗後分享感受',description:'可以談談當下的感受，也可以選擇不分享，不替他人解讀症狀。'}],
    aboutTitle:'靈氣體驗需要的是透明說明，不是神奇承諾。',about:'介紹你的學習背景、實際流派、體驗方式與收費資訊；不把靈性概念說成經醫學證實的療效。',
    practiceLabel:'靈氣體驗引導者（示範）',concepts:['自願參與','清楚界線','非醫療服務'],
    suitable:['想體驗放鬆與身心覺察方式的人','希望事先了解內容與可否觸碰的人'],
    notSuitable:['需要處理急性健康問題、診斷或醫療照護者','期待靈氣保證治癒疾病或取代已接受的治療者'],
    fitNotice:'靈氣屬非醫療性放鬆／靈性體驗，不應取代醫療、心理治療或其他實證照護。',
    faqs:[{question:'體驗時一定會碰觸身體嗎？',answer:'不一定。應事先清楚說明是否採觸碰，任何時候都可以拒絕或調整。'},{question:'靈氣可以治療疾病嗎？',answer:'目前沒有足夠可靠證據證明靈氣能治療特定疾病；本示範將它定位為個人放鬆與覺察體驗。'},{question:'體驗時沒有特殊感覺，正常嗎？',answer:'每個人的主觀體驗不同，沒有感覺也不代表個人做錯了什麼。'}],
    bookingTitle:'先了解體驗內容，再決定是否參與。',bookingDescription:'確認體驗時間、是否觸碰、空間安排與收費政策；本示範站不提供真實預約。',
    terms:'正式服務需明列觸碰與同意方式、收費及非醫療服務界線。',visitIntro:'清楚認識理念、流程與選擇權，帶著自己的步調參與。',pricingNote:'體驗形式、時長與費用由正式提供者設定。'
  }
};
