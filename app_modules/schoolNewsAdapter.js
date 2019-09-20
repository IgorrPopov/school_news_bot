const oneNewsAdapter = ({
    id,
    date,
    title_ua, 
    title_ru,
    title_en,
    text_ua, 
    text_ru,
    text_en,
    images,
    video
}) => {

    return {
        id,
        date,
        ua: { title: title_ua, text: text_ua}, 
        ru: { title: title_ru, text: text_ru},
        en: { title: title_en, text: text_en},
        image: images[0],
        video
    };
};


const schoolNewsAdapter = rawNews => rawNews.map(oneNewsAdapter);

module.exports = schoolNewsAdapter;