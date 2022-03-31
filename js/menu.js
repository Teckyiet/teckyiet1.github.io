const accountExpandButton = document.querySelector(".expand-button");
const accountRelatedListBox = document.querySelector(
  ".account-relates-wrapper ul",
);
const expandListCancelButton = document.querySelector(
  ".expand-button ul li:last-child a",
);

accountExpandButton.addEventListener("mouseover", () => {
  accountRelatedListBox.style.setProperty("max-height", "200px");
});

accountExpandButton.addEventListener("mouseout", () => {
  accountRelatedListBox.style.setProperty("max-height", "0px");
});

expandListCancelButton.addEventListener("click", () => {
  accountRelatedListBox.style.setProperty("max-height", "0px");
});

/* --------------------------------- menu-js -------------------------------- */
const expandToggleBtn = document.querySelectorAll(".items-category-bar");
const itemsListBox = document.querySelectorAll(".items-list");

for (let i = 0; i < expandToggleBtn.length; i++) {
  expandToggleBtn[i].addEventListener("click", () => {
    const selectedToggleBtn = expandToggleBtn[i];

    selectedToggleBtn.classList.toggle("items-category-bar--active");

    if (selectedToggleBtn.classList.contains("items-category-bar--active")) {
      const maxheight = itemsListBox[i].scrollHeight + "px";
      itemsListBox[i].style.setProperty("max-height", maxheight);
      itemsListBox[i].style.setProperty("padding-top", "10px");
    } else {
      itemsListBox[i].style.setProperty("max-height", 0);
      itemsListBox[i].style.setProperty("padding-top", "3px");
    }
  });
}

/* ----------------------------- item-click-btn ----------------------------- */
const itemListBtn = document.querySelectorAll("button.item-box");
const orderQuote = document.querySelectorAll(".order-detail-wrapper");
var itemQuantity = document.querySelectorAll(".order-detail-wrapper input");

for (let i = 0; i < itemListBtn.length; i++) {
  const itemClicked = itemListBtn[i];
  const showOrderQuote = orderQuote[i];
  const forCounter = i;

  itemClicked.addEventListener("click", () => {
    inputQuantity(forCounter);

    if (itemQuantity[forCounter].value != 0) {
      showOrderQuote.style.setProperty("display", "flex");
      itemClicked.classList.add("item-box-clicked");

      cartQuantityUpdate();

      dataStoring(i);
    } else {
      return;
    }
  });
}

let inputQuantity = (x) => {
  const showItemQuantity = itemQuantity[x];
  if (showItemQuantity.value == 0) {
    showItemQuantity.value = 1;
  } else {
    showItemQuantity.value++;
  }
};

/* ------------------------- 'plus' and 'minus' and remove btn ------------------------- */
const stepUpBtn = document.querySelectorAll(".quantity-increase-btn");
const stepDownBtn = document.querySelectorAll(".quantity-decrease-btn");
const removeBtn = document.querySelectorAll(".remove-btn");

for (let i = 0; i < itemListBtn.length; i++) {
  const clickStepUpBtn = stepUpBtn[i];
  const showItemQuantity = itemQuantity[i];
  clickStepUpBtn.addEventListener("click", () => {
    showItemQuantity.value++;
  });
}

for (let i = 0; i < itemListBtn.length; i++) {
  const clickStepDownBtn = stepDownBtn[i];
  const showItemQuantity = itemQuantity[i];
  const showOrderQuote = orderQuote[i];
  const itemClicked = itemListBtn[i];

  clickStepDownBtn.addEventListener("click", () => {
    if (showItemQuantity.value > 1) {
      showItemQuantity.value--;
    } else {
      showItemQuantity.value = 0;
      showOrderQuote.style.setProperty("display", "none");
      itemClicked.classList.remove("item-box-clicked");

      cartQuantityUpdate();
    }
  });
}

for (let i = 0; i < itemListBtn.length; i++) {
  const clickedRemoveBtn = removeBtn[i];
  const showItemQuantity = itemQuantity[i];
  const showOrderQuote = orderQuote[i];
  const itemClicked = itemListBtn[i];

  clickedRemoveBtn.addEventListener("click", () => {
    showItemQuantity.value = 0;
    showOrderQuote.style.setProperty("display", "none");
    itemClicked.classList.remove("item-box-clicked");

    cartQuantityUpdate();
  });
}

/* ----------------------------- Store Order Data for Cart ----------------------------- */
const cartBtn = document.querySelector(".to-cart-btn");
const itemOrderQuantity = document.querySelectorAll(
  ".order-quantity-display input",
);

cartBtn.addEventListener("click", () => {
  const itemList = document.querySelectorAll(".item-box:not(div)");

  localStorage.clear();

  for (i = 0; i < itemList.length; i++) {
    if (itemOrderQuantity[i].value != 0) {
      dataStoring(i);
    } else {
    }
  }
});

window.addEventListener("load", () => {
  const savedItemID = [];

  for (let i = 0; i < 100; i++) {
    if (typeof localStorage.getItem("item image " + i) === "string") {
      savedItemID.push(localStorage.getItem("item ID " + i));
    }
  }

  for (let i = 0; i < savedItemID.length; i++) {
    const counter = savedItemID[i];
    const itemClicked = itemListBtn[counter];
    const showOrderQuote = orderQuote[counter];

    if (savedItemID.length > 0) {
      showOrderQuote.style.setProperty("display", "flex");
      itemClicked.classList.add("item-box-clicked");

      itemQuantity[counter].value = localStorage.getItem(
        "order quantity " + counter,
      );

      cartQuantityUpdate();
    } else {
      return;
    }
  }

  localStorage.clear();
});

/* ---------------------------- Function Library ---------------------------- */

/* ----------------------------- 1. data-storing ---------------------------- */
let dataStoring = (index) => {
  const itemOrderQuantity = document.querySelectorAll(
    ".order-quantity-display input",
  );
  const itemTitle = document.querySelectorAll(".item-title");
  const itemPrice = document.querySelectorAll(".item-price");
  const itemImage = document.querySelectorAll(".object-img");
  const itemUrl = [];

  for (let j = 0; j < itemImage.length; j++) {
    const style = window.getComputedStyle(itemImage[j], false);
    const bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    itemUrl.push(bi);
  }

  localStorage.setItem("item ID " + index, index);
  localStorage.setItem("item image " + index, itemUrl[index]);
  localStorage.setItem("order item " + index, itemTitle[index].innerHTML);
  localStorage.setItem("price of item " + index, itemPrice[index].innerHTML);
  localStorage.setItem(
    "order quantity " + index,
    itemOrderQuantity[index].value,
  );
};

let cartQuantityUpdate = () => {
  const activeItemBox = document.querySelectorAll(".item-box-clicked");
  const cartQuantity = document.querySelector(".to-cart-btn");
  cartQuantity.style.setProperty(
    "--cartnumber",
    '"' + activeItemBox.length + '"',
  );
};
