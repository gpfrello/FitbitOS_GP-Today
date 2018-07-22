function mySettings(props) {
    let colorSetBackground = [
  {color: "#0000FF"},  
  {color: 'black'},
  {color: 'deepskyblue'}, 
  {color: 'teal'},
  {color: 'midnightblue'},      
  {color: 'darkslategrey'},       
  {color: 'darkorchid'},
      
  {color: '#8B4513'},
  {color: 'navy'},        
  {color: '#00163a'},
  {color: '#21003a'},      
  {color: '#969696'}, 
  {color: '#494949'}, 
  {color: '#2d2d2d'}
];
  let colorSetTexts = [
  {color: "#FF00FF"},   
  {color: "#FFFF00"},  
  {color: 'cyan'},  
  {color: "#FF0000"},  
  {color: "#00FF00"},  
  {color: "#0000FF"},  
  {color: "white"} ,
    
  {color: 'black'},
  {color: 'cornsilk'},
  {color: 'gold'},
  {color: 'deepskyblue'}, 
  {color: 'teal'},
  {color: 'violet'},
  {color: 'midnightblue'},
    
  {color: 'yellowgreen'},
  {color: 'crimson'},
  {color: 'lightseagreen'}, 
  {color: 'salmon'},
  {color: '#00FA9A'},  
  {color: 'darkred'},  
  {color: 'darkslategrey'},  
    
  {color: 'darkorchid'},
  {color: 'darkorange'},    
  {color: 'lightsteelblue'},
  {color: 'skyblue'},
  {color: '#8B4513'},
  {color: 'khaki'}, 
  {color: 'palegoldenrod'},  
    
  {color: 'navy'},    
  {color: '#00163a'},
  {color: '#21003a'},
  {color: '#3a1d00'},
  {color: '#969696'}, 
  {color: '#494949'}, 
  {color: '#2d2d2d'}
];
  return (
    <Page>
      <Section   
        title ={<Text bold align="center">Background Color</Text>}>
        <ColorSelect
          settingsKey="backgroundColor"
          colors={colorSetBackground}
       />
      </Section>
      <Section   
        title ={<Text bold align="center">Text Color</Text>}>
        <ColorSelect
          settingsKey="textColor"
          colors={colorSetTexts}
       />
         </Section>
      <Section   
        title ={<Text bold align="center">Time Color</Text>}>
        <Text>It changes also the color of your target data when the goal is met.</Text>
        <ColorSelect
          settingsKey="timeColor"
          colors={colorSetTexts}
       />
         </Section>
      <Section
        title={<Text bold align="center">Contact Me</Text>}>
        <Text>
          I'm a 47 years old guy with a busy real life who loves to keep learning. I'm thrilled you are using my little application and  would be really happy if you write me an email with suggestions, bugs reports, wishes or just to say you are using GP Today. I will try my best to fullfill your wishes depending on my free time and limited capabilities.
        </Text>
        <Link source="https://rawgit.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/master/settings/email.html">
          <TextImageRow
            label="Email"
            sublabel="gp.frello@gmail.com"
            icon="https://github.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/blob/master/resources/icons/settings/Email.png?raw=true"
          />
        </Link>
        <Link source="https://github.com/gpfrello">
          <TextImageRow
            label="Github"
            sublabel="https://github.com/gpfrello"
            icon="https://github.com/gpfrello/FitbitOS_GP-Today/blob/master/resources/icons/settings/Github.png?raw=true"
          />
        </Link>
        <Link source="https://paypal.me/gpfrello">
          <TextImageRow
            label="PayPal"
            sublabel="gp.frello@gmail.com"
            icon="https://github.com/gpfrello/FitbitOS_GP-Today/blob/master/resources/icons/settings/Paypal.png?raw=true"
          />
        </Link>
      </Section>
     </Page>
   );
}

registerSettingsPage(mySettings);