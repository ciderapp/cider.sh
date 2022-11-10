<template>
    <div>
        <div class="flex center column">
            <img class="logo" src="~/assets/cider.png" />
            <div class="title">Cider</div>
            <div class="description">An open-source, community-oriented Apple Music client for Windows, Linux, macOS, and more.</div>
            <button class="ui-button">Download</button>
        </div>
    </div>
</template>

<style lang="scss">

.ui-button {
    padding: 1rem;
    width: fit-content;
    border-radius: 5rem;
    border:  .0625rem solid #fff;
    transition: all .2s ease-in-out;
    font-weight: 700;
    text-align: center;
    font-size: 1.125rem;
    background-color: #fff;
}

.ui-button:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.logo {
    width: 150px;
    height: 150px;
}

.title {
    font-size: 2.75rem;
    line-height: 1.2;
    font-weight: 700;
    margin: 20px 0;
}

.description {
    font-size: 1.4375rem;
    line-height: 1.5;
    font-weight: 400;
    margin: 20px 0;
    width: calc((4rem * 6) + (2rem * 5));
    text-align: center;
}
</style>