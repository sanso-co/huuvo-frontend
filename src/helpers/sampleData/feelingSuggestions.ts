export const feelings = [
    {
        value: "feeling-love",
        label: "Feeling love",
        emoji: "😍",
    },
    {
        value: "feeling-down",
        label: "Feeling down",
        emoji: "😔",
    },
    {
        value: "tired-drained",
        label: "Tired & drained",
        emoji: "😴",
    },

    {
        value: "emotionless",
        label: "Emotionless",
        emoji: "😶",
    },
    {
        value: "stressed-out",
        label: "Stressed out",
        emoji: "🤯",
    },
    {
        value: "need-a-boost",
        label: "Need a boost",
        emoji: "😊",
    },
];

export const feelingDescriptions = {
    "feeling-down": "Uplifting stories perfect for hope and comfort",
    "tired-drained": "Gentle stories perfect for relaxation and rejuvenation",
    "feeling-love": "Love stories perfect for butterflies and romance",
    emotionless: "Compelling stories perfect for reigniting your emotions",
    "stressed-out": "Calming stories perfect for unwinding and peace",
    "need-a-boost": "Feel-good stories perfect for a laugh and some healing",
};

// export const feelingSuggestions: { [key: string]: string[] } = {
//     "feeling-down": [
//         "요즘은 위로가 되는 드라마가 필요해요",
//         "잔잔하고 감정적인 이야기를 보고 싶어요",
//         "기분이 가라앉을 때 도움이 되는 작품 없을까요?",
//         "울고 나면 조금 나아질 것 같아요, 그런 이야기 있을까요?",
//         "감정을 터트릴 수 있는 드라마가 보고 싶어요",
//         "마음이 복잡할 때 조용히 빠져들 수 있는 작품이 좋아요",
//     ],
//     "tired-drained": [
//         "머리 쓰지 않고 편하게 볼 수 있는 드라마 찾고 있어요",
//         "지쳤을 때 힐링되는 이야기 없을까요?",
//         "그냥 아무 생각 없이 볼 수 있는 거 추천해주세요",
//         "요즘 너무 피곤해서 가벼운 이야기만 보고 싶어요",
//         "잔잔하게 흘러가는 일상 드라마가 좋아요",
//         "밝고 단순한 이야기로 쉬고 싶어요",
//     ],
//     "feeling-love": [
//         "설레는 로맨스가 보고 싶어요",
//         "심쿵하는 장면 많은 드라마 추천해주세요",
//         "요즘 사랑 이야기만 보면 기분이 좋아져요",
//         "느긋하게 피어나는 관계가 그려지는 드라마 좋아해요",
//         "달달한 감정에 빠질 수 있는 작품이 있으면 좋겠어요",
//         "로맨틱한 분위기에 몰입하고 싶어요",
//     ],
//     emotionless: [
//         "감정이 잘 느껴지지 않을 때 볼 수 있는 이야기 없을까요?",
//         "현실 감정에서 잠시 벗어나고 싶어요",
//         "그냥 무작정 빠져들 수 있는 드라마가 필요해요",
//         "마음이 공허할 때 잘 어울리는 작품 추천해주세요",
//         "무감각한 기분을 흔들어줄 수 있는 이야기 보고 싶어요",
//         "감정을 자극해주는 드라마를 찾고 있어요",
//     ],
//     "stressed-out": [
//         "요즘 너무 스트레스를 받아서, 현실도피할 수 있는 거 없을까요?",
//         "빠르게 몰입되는 드라마로 머릿속을 비우고 싶어요",
//         "웃으면서 스트레스를 날릴 수 있는 코미디가 좋겠어요",
//         "복잡한 생각을 잠시 잊게 해줄 드라마 추천해주세요",
//         "긴장감 넘치는 스릴러도 좋을 것 같아요",
//         "하루를 잊고 다른 세계에 빠질 수 있는 드라마 원해요",
//     ],
//     "need-pick-me-up": [
//         "기분 전환할 수 있는 밝은 이야기 보고 싶어요",
//         "웃을 수 있는 드라마가 필요해요",
//         "에너지를 북돋아줄 긍정적인 내용이 좋아요",
//         "가볍고 유쾌한 드라마로 하루를 마무리하고 싶어요",
//         "기운 없을 때 힘이 되는 드라마 있나요?",
//         "힐링과 활력을 동시에 줄 수 있는 이야기 찾고 있어요",
//     ],
// };

export const feelingSuggestions: { [key: string]: string[] } = {
    "feeling-love": [
        "Any dramas with sweet moments that make your heart race?",
        "I’m craving a dramatic romance that’s emotional, heartbreaking, yet deeply moving.",
        "Got any mature romances with grown-up communication?",
    ],
    "need-a-boost": [
        "I’m looking for a feel-good series to brighten my mood.",
        "I want a story about becoming confident and independent.",
    ],
    "tired-drained": [
        "Feeling drained and want something wholesome and healing.",
        "Any dramas that feel like a peaceful retreat at the end of the day?",
        "I want slow, everyday kind of dramas.",
        "Can you recommend a drama that feels like a warm hug?",
    ],
    "feeling-down": [
        "I think a good cry might help me right now.",
        "I’m craving a drama that feels wholesome and heartwarming, with warm and lovable moments.",
        "I need something comforting",
    ],
    emotionless: [
        "I’m looking for something powerful, raw, and intense enough to shake me out of this fog.",
        "I want something immersive and character-driven, not light comedy but serious and meaningful.",
        "Feeling blank but want a gripping show from episode one, full of twists and tension.",
    ],
    "stressed-out": [
        "I just need a fun drama to take my mind off things.",
        "Can you recommend a drama that’s fast-paced and keeps me hooked the whole time?",
        "What’s a good drama to help me relax and de-stress after a hard day?",
    ],
};

export const mockApiResponse = [
    {
        poster_path: {
            US: {
                path: "/xJQyrif5M4UMoVBrBlwUabtaRxB.jpg",
            },
        },
        _id: "66f22cbb846c922ba1c8b7dd",
        id: 230923,
        name: "Lovely Runner",
        original_name: "선재 업고 튀어",
        first_air_date: "2024-04-08T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A heartwarming romance about turning back time to save love",
        emotional_appeal: "The desperate hope to change fate and pure love will warm your heart",
    },
    {
        poster_path: {
            US: {
                path: "/sT5Mlt5UmKiGfBisccwmD4LnPRD.jpg",
            },
        },
        _id: "66f420e5fcc4de5e004836ad",
        id: 135840,
        name: "Our Blues",
        original_name: "우리들의 블루스",
        first_air_date: "2022-04-09T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A heartwarming slice-of-life story set in Jeju Island",
        emotional_appeal: "Gentle, healing, and heartwarming",
    },
    {
        poster_path: {
            US: {
                path: "/m56EaJ4zLG84F8jpNT7ZmaL0IAS.jpg",
            },
            KR: {
                path: "",
            },
        },
        _id: "66f22e68846c922ba1c8b906",
        id: 212204,
        name: "Twinkling Watermelon",
        original_name: "반짝이는 워터멜론",
        first_air_date: "2023-09-25T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A youth time-slip drama blending music and family bonds",
        emotional_appeal:
            "A special meeting between father and son, bridging generations with understanding and growth",
    },
    {
        poster_path: {
            US: {
                path: "/vf9SNXNAFqzKBGksFwrXhkg9cb7.jpg",
            },
            KR: {
                path: "",
            },
        },
        _id: "66f2292e846c922ba1c8b6b3",
        id: 126485,
        name: "Moving",
        original_name: "무빙",
        first_air_date: "2023-08-09T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A human drama about a family with superpowers living ordinary lives",
        emotional_appeal:
            "Finding the extraordinary in the ordinary, with deep emotion from a family's protective love",
    },
    {
        poster_path: {
            US: {
                path: "/bTQk4YZMESbHs3NlhBPBpcQp1Tn.jpg",
            },
            KR: {
                path: "",
            },
        },
        _id: "66f228d3846c922ba1c8b682",
        id: 206693,
        name: "Dear My Friends",
        original_name: "디어 마이 프렌즈",
        first_air_date: "2016-05-13T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A touching story of friendship among life's mentors",
        emotional_appeal: "Quiet moments that slowly heal and restore",
    },
    {
        poster_path: {
            US: {
                path: "/gYJBz6NMvP4oc2mf181bjPJSgxJ.jpg",
            },
        },
        _id: "66f22e55846c922ba1c8b8de",
        id: 204589,
        name: "My Perfect Stranger",
        original_name: "어쩌다 마주친, 그대",
        first_air_date: "2023-05-01T00:00:00.000Z",
        popularity_score: 0,
        short_description: "A flutter-filled romance that starts from an unexpected encounter",
        emotional_appeal:
            "Feel the preciousness of unexpected connections and the excitement of new beginnings",
    },
];
