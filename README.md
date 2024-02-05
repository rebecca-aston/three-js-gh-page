# three-js-gh-page
 
This repo shows an example of deploying a site to github pages using [gh-pages](https://www.npmjs.com/package/gh-pages) which is installed as a dev dependancy to the package.json. This also uses [vite](https://vitejs.dev/) as a build tool and [three.js](https://threejs.org/).

__To get started:__

- only the first time on the command line run:
```
  npm install 
``` 
- Every time you develop / test (look at package.json to change port for static server):
```
  npm run dev
```
- To build your static site:
```
  npm run build
```
- To preview a static site / build, after you have run the above command:
```
  npm run preview
```

__To deploy to github pages:__

NOTE: Before running any commands to deploy to github pages, this code must be set up using github on a public repository that has been published remotely/online. 

- Once you have built your site using `npm run build`
- To automatically deploy the dist folder to a gh-pages branch (which will automatically convert your repo to a github pages repo because of the presence of the gh-pages repo), run this command:
```
  npm run deploy
```


__Notes on implementation:__

In the package.json you will note that the npm run command for the build has `--base=./` flag added, this is so that the paths used in the index.html of the build files will use relative paths and so work with github. 

The other thing to note is that the gh-pages command copies the dist folder and publishes it to a remote repo in a gh-pages branch
```
  "scripts": {
    "dev": "vite --port 5500 --open",
    "build": "vite build --base=./",
    "preview": "vite preview --open",
    "deploy": "gh-pages -d dist"
  }
```

