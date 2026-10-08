import type { Theme } from '../data';

/** Four distinct editorial demo identities, one for each knowledge-site visual theme.
 * Editorial copy is illustrative; article listings still use actual Content Collection entries.
 */
export interface KnowledgePractice {
  specialty: string; eyebrow: string; hero: string; intro: string; promise: string;
  topicHeading: string; topics: {title:string;description:string;short:string}[];
  featuredHeading:string; featuredTitle:string; featuredIntro:string;
  aboutTitle:string; about:string; startHere:{title:string;description:string}[];
  resourceTitle:string; resourceIntro:string; newsletterTitle:string; newsletterIntro:string;
}
export const knowledgePractice:Record<Theme,KnowledgePractice> = {
  paper: {
    specialty:'資訊', eyebrow:'TECHNOLOGY · DIGITAL LIFE',hero:'把值得知道的資訊，整理成自己的觀點。',
    intro:'記錄數位工具、科技趨勢和網路生活裡值得理解的變化。少一點資訊焦慮，多一點清楚的脈絡。',
    promise:'資訊很多，留下真正有用、也願意反覆閱讀的部分。',
    topicHeading:'從四個資訊主題開始',
    topics:[
      {title:'數位工具',description:'分享軟體、日常工具與使用體驗，關心它們如何真正改善生活。',short:'實際使用過的工具和操作心得。'},
      {title:'科技觀察',description:'從新技術到產品變化，整理事件背景與值得追問的問題。',short:'理解科技消息背後的脈絡。'},
      {title:'網路生活',description:'觀察網路文化、平台與社群如何改變我們的溝通方式。',short:'關於平台、社群與數位習慣。'},
      {title:'資訊整理',description:'把資料分門別類，練習查證、比較並形成自己的判斷。',short:'從蒐集資料走向理解與查證。'}
    ],
    featuredHeading:'最近整理的資訊與觀察',featuredTitle:'在訊息很多的時代，保留一個能慢慢理解的地方。',
    featuredIntro:'從觀察到整理，讓值得留下的資訊有自己的位置。',
    aboutTitle:'比起追每一則新消息，我更想弄懂事情怎麼發生。',
    about:'這裡是資訊整理型部落格的示範。正式網站可以換成作者真實的工具經驗、科技觀點與個人故事。',
    startHere:[
      {title:'第一次來，先讀精選',description:'從幾篇示範文章認識這裡怎麼整理與分享資訊。'},
      {title:'依資訊類別探索',description:'從數位工具、科技觀察、網路生活與資訊整理選擇感興趣的方向。'},
      {title:'想找到過去的文章',description:'前往文章列表，使用關鍵字、標籤與日期找內容。'}
    ],
    resourceTitle:'資訊整理的延伸資源',resourceIntro:'示範如何放置有授權的資料、工具清單與延伸閱讀連結。',
    newsletterTitle:'把值得知道的資訊留給下一次閱讀',newsletterIntro:'示範訂閱入口；尚未連接任何電子報服務。'
  },
  morning: {
    specialty:'宅文化',eyebrow:'ANIME · GAMES · STORIES',hero:'把喜歡的作品，寫成會想再翻的收藏。',
    intro:'聊動畫、漫畫、遊戲與影視裡讓人著迷的細節，從角色、劇情到自己的觀看心得。',
    promise:'喜歡一個作品不需要理由，記下感動卻很值得。',
    topicHeading:'從四種宅文化興趣開始',
    topics:[
      {title:'動畫與漫畫',description:'記錄作品的敘事、畫面與角色，分享自己的追番和閱讀觀察。',short:'追番心得、漫畫與故事。'},
      {title:'遊戲世界',description:'從遊玩體驗到遊戲敘事，分享探索虛構世界的樂趣。',short:'遊戲體驗與世界觀筆記。'},
      {title:'角色與故事',description:'聊讓人印象深刻的人物、角色成長與值得重看的橋段。',short:'角色、劇情與那些名場面。'},
      {title:'收藏與活動',description:'記下展覽、同人活動、週邊收藏與和同好相遇的時刻。',short:'周邊、展覽與同好文化。'}
    ],
    featuredHeading:'最近想聊的作品與故事',featuredTitle:'有些故事看完了，還是想再聊很久。',
    featuredIntro:'留住角色、劇情與遊玩當下的真實感受。',
    aboutTitle:'這裡是把熱愛變成文字的小小收藏室。',
    about:'這是宅文化部落格的示範，作品評論與喜好都應由真正的作者填寫，不冒用作品圖像或評論。',
    startHere:[
      {title:'第一次來，先從喜歡的作品開始',description:'看看示範內容的閱讀方式，再選擇自己有興趣的類型。'},
      {title:'依宅文化興趣探索',description:'動畫漫畫、遊戲世界、角色故事與收藏活動，從最喜歡的一項出發。'},
      {title:'找一篇想討論的文章',description:'到文章列表試用搜尋、標籤與日期功能。'}
    ],
    resourceTitle:'作品與創作的延伸收藏',resourceIntro:'正式使用時可分享合法引用的作品資訊、活動網站及推薦清單。',
    newsletterTitle:'偶爾聊聊最近沉迷的故事',newsletterIntro:'示範追蹤更新入口；尚未連接電子報服務。'
  },
  studio: {
    specialty:'心理',eyebrow:'PSYCHOLOGY · EVERYDAY LIFE',hero:'從日常的感受，慢慢理解自己與他人。',
    intro:'整理情緒、人際關係與自我覺察的閱讀筆記，用生活中的小事探索心理議題，不把觀點當作診斷。',
    promise:'少一些急著下結論，多一些溫柔而清楚的理解。',
    topicHeading:'從四種心理觀察開始',
    topics:[
      {title:'情緒日常',description:'辨認生活裡不同的感受，記下它們何時出現、帶來什麼提醒。',short:'感受、情緒與日常觀察。'},
      {title:'人際關係',description:'從相處與溝通經驗思考界線、期待與關係中的選擇。',short:'互動、界線與溝通練習。'},
      {title:'自我探索',description:'用提問和書寫回顧自己的想法、習慣與價值觀。',short:'認識習慣、信念和選擇。'},
      {title:'心理閱讀',description:'分享心理相關書籍與概念的閱讀心得，保留適用範圍與資料來源。',short:'心理書摘與概念筆記。'}
    ],
    featuredHeading:'最近記下的心理觀察',featuredTitle:'有些心情不用立刻解決，也值得好好理解。',
    featuredIntro:'透過文字整理觀察，不把個人經驗誤當成專業治療建議。',
    aboutTitle:'喜歡從生活裡的小細節，慢慢思考人的感受。',
    about:'這裡是心理主題閱讀與生活觀察的 Demo，不代表作者擁有心理師資格，也不提供診斷或治療。',
    startHere:[
      {title:'第一次來，先讀一段觀察',description:'以日常經驗開始閱讀，沒有必要先懂專業名詞。'},
      {title:'找到想理解的心理議題',description:'從情緒日常、人際關係、自我探索與心理閱讀開始。'},
      {title:'想再深入了解',description:'到文章列表挑一篇感興趣的示範文章，並查閱適用的來源。'}
    ],
    resourceTitle:'心理閱讀與自我探索資源',resourceIntro:'此處可放書單、研究來源與可核實的公共資訊；示範站不提供心理治療。',
    newsletterTitle:'偶爾留一段關於生活的觀察',newsletterIntro:'示範訂閱入口，未串接電子報，也不承諾提供諮商服務。'
  },
  botanical: {
    specialty:'旅遊',eyebrow:'TRAVEL · PLACES · WANDER',hero:'走過的地方，留下可以重訪的風景。',
    intro:'記錄城市散步、地方小店與旅途中的發現，把照片、路線和故事整理成自己的旅行筆記。',
    promise:'不急著蒐集景點，更想記住在路上的感受。',
    topicHeading:'從四種旅行方式開始',
    topics:[
      {title:'城市散步',description:'記錄街道、巷弄與日常風景，發現城市中值得停下的角落。',short:'巷弄、建築與走路看到的事。'},
      {title:'地方風景',description:'從山海到鄉鎮，記下不同季節與地方的樣貌。',short:'自然景色與地方觀察。'},
      {title:'旅途飲食',description:'收藏旅行中吃過的味道與地方飲食記憶，不杜撰店家經驗。',short:'市場、小店與旅途中的味道。'},
      {title:'路線與筆記',description:'整理交通、步行路線與行前準備，讓旅程更容易回顧。',short:'行程規劃與旅行整理。'}
    ],
    featuredHeading:'最近記錄的路上風景',featuredTitle:'旅行不一定要走很遠，新的故事就在路上。',
    featuredIntro:'從散步到長途旅行，把值得回味的片刻收進筆記。',
    aboutTitle:'喜歡慢慢走，看看每個地方如何過自己的日子。',
    about:'這裡是旅遊文字與路線記錄的示範。正式網站應加入作者真實走訪、照片及可查證的交通資訊。',
    startHere:[
      {title:'第一次來，先散步看看',description:'從旅行筆記的閱讀方式開始，慢慢選擇想看的地方。'},
      {title:'依旅行興趣探索',description:'城市散步、地方風景、旅途飲食和路線筆記各有不同角度。'},
      {title:'想安排下次出走',description:'瀏覽文章列表與日期，收藏真正符合需求的旅遊內容。'}
    ],
    resourceTitle:'旅行路線與資料收藏',resourceIntro:'可在正式網站放合法地圖連結、交通資訊及真實行程筆記。',
    newsletterTitle:'把路上的好風景偶爾寄給你',newsletterIntro:'示範訂閱入口，尚未串接電子報服務。'
  }
};
