const apiUrl =
  'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

const cardHolder = document.querySelector('.cardHolder');
const dateFormatFunc = (inputDate) => {
  const newDate = new Date(inputDate);
  const dateParams = { day: '2-digit', month: 'long', year: 'numeric' };
  return newDate.toLocaleDateString(undefined, dateParams);
};

const fetchInfo = async () => {
  const apiInfo = await fetch(apiUrl);
  const apiData = await apiInfo.json();
  console.log(apiData);
  apiData.map((info) => {
    const announcement = info._embedded['wp:term'][2][0]?.name
      ? info._embedded['wp:term'][2][0]?.name
      : info._embedded['wp:term'][1][0]?.name;
    const postDate = dateFormatFunc(info.date);
    const postDataObj = {
      title: info.title.rendered,
      articleUrl: info.link,
      date: postDate,
      imgUrl: info.featured_media,
      authorName: info._embedded.author[0].name,
      authorUrl: info._embedded.author[0].link,
      category: info._embedded['wp:term'][0][0].name,
      announcement: announcement,
    };
    const dataCard = document.createElement('div');
    dataCard.innerHTML = `
    <div class='cardBox'>
    <div>
    <h2 class="p-heading--5">${postDataObj.announcement}</h2>
   <hr  />
   <div class="p-card__content imgHolder">
     <img class="p-card__image" src="${postDataObj.imgUrl}" />
     </div>
     <div>
       <a href="${postDataObj.articleUrl}">
         <h3>${postDataObj.title}</h3>
       </a>
       </div>
    </div>
      <div class='bottomText'>
        <h6> By
        <a href="${postDataObj.authorUrl}" target="”_blank”"
          >${postDataObj.authorName}</a
        >
        on ${postDataObj.date} </h6>
        <hr class="u-no-margin--bottom" />
        <p>${postDataObj.category}</p>
  </div>
      </div>
  `;
    dataCard.classList.add('p-card--highlighted', 'col-4', 'dataCard');
    cardHolder.append(dataCard);
  });
};

fetchInfo();
