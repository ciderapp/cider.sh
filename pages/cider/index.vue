<template>
  <div>
    <div class="flex center column padding">
      <img src="~/assets/cider.png" class="logo" />
      <div class="title">Cider</div>
      <div class="description">
        An open-source, community-oriented Apple Music client for Windows,
        Linux, macOS, and more.
      </div>
      <button class="ui-button download">Download Now</button>
      <div class="showcase-section left">
        <img src="~/assets/showcase/cider-1.png" />
        <div class="showcase-text">
          <h1>Usability</h1>
          <p>Cider is built from the ground up using technologies like Vue 3 and 
            Electron to provide you with the best possible User Experience.
            With the help of our wonderful community, we have listened to the
            problems you have and the features you want from your streaming client.</p>
        </div>
      </div>
      <div class="showcase-section right">
        <img src="~/assets/showcase/cider-1.png" />
        <div class="showcase-text">
          <p>HI</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.logo {
  width: 150px;
  height: 150px;
}

.download {
  margin-bottom: 100px;
}

.showcase-section {
  width: 100vw;
  padding: 50px 20px;
  display: flex;
  align-items: center;
  img {
    width: 600px;
    margin-left: 2rem;
    height: auto;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
  .showcase-text {
    display: inline;
    width: 33%;
    p {
      font-size: 1.1rem;
      line-height: 1.1;
    }
    h1 {
      text-align: center;
    }
  }
}

.right {
  flex-direction: row-reverse;
  img {
    margin: 0 2rem 0 0;
  }
  .showcase-text {
    text-align: right;
  }
}
</style>
