const loadPhone = async (searchText = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  phoneDisplay(phones, isShowAll);
}
const phoneDisplay = (phones, isShowAll) => {
  // console.log(phones)

  const phoneContainer = document.getElementById('phone-container');
  // clear 

  phoneContainer.textContent = '';

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  };
  // console.log('is show all', isShowAll)
  // console.log(phones.length);
  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }

  phones.forEach(phone => {
    // console.log(phone);

    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-gray-100 gap-8 mb-4 p-4 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title justify-center">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handlesShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        
        `;
    phoneContainer.appendChild(phoneCard);

  });
  loadingSprinnerContainer(false);
};
const handlesShowDetails = async (id) => {
  console.log('clicked show details', id);
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  phoneDetails(phone);
};
const phoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <h2 class="text-3xl"><span>${phone.mainFeatures.memory}</span></h2>
  `
  // show phone details
  show_details_modal.showModal();
}

// search handle
const searchHandle = (isShowAll) => {
  loadingSprinnerContainer(true);
  // console.log('search handle')

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText)
  loadPhone(searchText, isShowAll);
}
// search recap
const searchHandler = (isShowAll) => {
  // console.log('search')
  loadingSprinnerContainer(true);
  const searchField = document.getElementById('search-field1');
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText)
}

const loadingSprinnerContainer = (isLoading) => {
  const loadingSprinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSprinner.classList.remove('hidden');

  }
  else {
    loadingSprinner.classList.add('hidden');
  }
};
// show handle
const handleShowAll = () => {
  searchHandle(true);
};
loadPhone();
