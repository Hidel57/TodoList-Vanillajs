
const onClickTab = (evt, tab) => {
    const tabContent = document.getElementsByClassName("cards-container")
    const tabLink = document.getElementsByClassName("tab__link")

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    for (let i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "")
    }

    document.getElementById(tab).style.display = "flex"
    evt.currentTarget.className += " active"
}
