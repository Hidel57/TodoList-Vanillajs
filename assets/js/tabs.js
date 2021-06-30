
const onClickTab = (evt, tab) => {
    const tabContent = document.getElementsByClassName("tab__content")
    const tabLink = document.getElementsByClassName("tab__link")

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    for (let i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "")
    }

    document.getElementById(tab).style.display = "block"
        evt.currentTarget.className += " active"
}
