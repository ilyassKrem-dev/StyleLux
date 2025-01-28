
### About

StyleLux is a clothing shop built by React.js and Springboot.


![StyleLux][StyleLux]


### Built With
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCss]][TailwindCss-url]  [![Framer][Framer]][Framer-url]
* [![Spring][Spring]][Spring-url]  [![JAVA][JAVA]][JAVA-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Stripe][Stripe]][Stripe-url] [![Redux][Redux]][Redux-url]

  
###  Features
- Simple design
- Responsive.
- Admin dashboard
- Payment system
- User Account System
- and more
  
### Start the website
1. Clone the repo
   ```sh
   gh repo clone ilyassKrem-dev/StyleLux
   ```
## Front-End env file

  2. Add from [Google console](https://console.cloud.google.com/)
      ```sh  
       VITE_CLIENT_ID=
       VITE_CLIENT_SECRET=
       VITE_API_G_API_KEY=
       VITE_API_G_CLIENT_SECRET_API=
       VITE_API_G_CLIENT_ID_API=
     ```
  3. Add a Secret Key for Crypt.js
      ```sh
      VITE_SECRET_KEY=
     ```
  4. Add the url of the backend to 
      ```sh
       VITE_API_SPRING_URL=
     ```
  5. Add an Ip token from [IpInfo](https://ipinfo.io/)
      ```sh
       VITE_IP_TOKEN=
     ```  
  6. Add from [Stripe](https://stripe.com/)
     ```sh
       VITE_PUBLIC_STRIPE_KEY=
     ```


## Back-End env file

1. Check application.yml in the resources folder in shop-server


## Finally
  Run
   ```sh
     cd shop-app
     npm install
     npm run dev
   ```
  And
   ```sh
     cd shop-server
     mvn spring-boot:run
   ```





<!-- MARKDOWN LINKS & IMAGES -->

[Framer]:https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]:https://www.framer.com/motion/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCss]:https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCss-url]:https://tailwindcss.com/
[StyleLux]:https://www.dropbox.com/scl/fi/jn5s7ze5kf76kbsjx3hre/StyleLux.png?rlkey=ab6fofdeq79ntypxsgfqkyjzn&st=veprjno7&raw=1
[Spring]:https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]:https://spring.io/
[JAVA]:https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[JAVA-url]:https://www.java.com/en/
[MySQL]:https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]:https://www.mysql.com/
[Stripe]:https://img.shields.io/badge/Stripe-5469d4?style=for-the-badge&logo=stripe&logoColor=ffffff
[Stripe-url]:https://stripe.com/
[Redux]:https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]:https://redux.js.org/
