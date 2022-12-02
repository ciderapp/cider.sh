<script setup>
let data;
let dataready = ref(false);
let stabledata;
let nightlydata;
fetch("https://api.github.com/repos/ciderapp/cider-releases/releases?per_page=100").then(res => res.json()).then(json => {
  data = json;
  data.sort((a, b) => { return Date.parse(b.published_at) - Date.parse(a.published_at) });
  stabledata = data.filter(data => data.name.includes('stable'))[0]
  nightlydata = data.filter(data => data.name.includes('main'))[0]
  dataready.value = true;
})
</script>

<template>
    <div class="flex center column padding">
      <img src="~/assets/cider.png" class="logo" />
      <div class="title">Download Cider</div>
      <div class="description">
        Now for the fun part, pick your flavor.
      </div>
      <div class="card-cont">
        <div class="card">
          <img src="~/assets/beta.webp" />
          <h4>Nightly Releases</h4>
          <p>Feeling experimental? Try the Nightly builds.</p>
          <div v-if="dataready">
            <pre>{{ nightlydata.tag_name.slice(0, -3)+Number(nightlydata.tag_name.slice(-3)) }}</pre>
            <div class="button-cont">
              <a class="btn">DMG</a>
              <a class="btn">PKG</a>
              <a class="btn">AppImage</a>
              <a class="btn">Debian</a>
              <a class="btn">Snap</a>
              <a>
                
              </a>
            </div>
          </div>
        </div>
        <div class="card">
          <img src="~/assets/beta.webp" />
          <h4>Nightly Releases</h4>
          <p>Feeling experimental? Try the Nightly builds.</p>
          <pre>v1.6.0-beta.67</pre>
        </div>
        <div class="card">
          <img src="~/assets/beta.webp" />
          <h4>Nightly Releases</h4>
          <p>Feeling experimental? Try the Nightly builds.</p>
          <pre>v1.6.0-beta.67</pre>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
.card-cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70rem;
  gap: 2rem;
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(63, 63, 63);
    border-radius: 0.5rem;
    height: 530px;
    padding: 2.25rem;
    box-sizing: border-box;
    text-align: center;
    &:hover {
      box-shadow: -13px 11px 25px 1px rgba(0,0,0,.55);
    }

    img {
      height: 100px;
      width: auto;
      margin-bottom: 2.25rem;
      display: block;
    }

    h4 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 2.25rem;
      font-size: 1.125rem;
    }

    div {
      div {
        a {
          margin-inline: 5px;
          flex: 1 1 auto;
          background-color: #f8f9fa;
          padding: 0.5rem 1rem;
          color: #000;
          display: inline-block;
          margin-block: 5px;
          border-radius: .375rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.2s ease-in-out;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
