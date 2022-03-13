import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import EyeIcon from '../../icons/EyeIcon';
import { ConfigurationPage, IntroPage, TrainigPage } from './components';
import './Options.scss';

interface Props {
  title: string;
}

const contentPages = {
  intro: IntroPage,
  training: TrainigPage,
  config: ConfigurationPage,
};

type PageOption = 'intro' | 'training' | 'config';

const Options: React.FC<Props> = ({ title }: Props) => {
  const [selectedPage, setSelectedPage] = useState<PageOption>('config');

  const ContentPage = contentPages[selectedPage];

  return (
    <div className="OptionsContainer">
      <div className="top-section header">
        <EyeIcon />
        &nbsp;
        <EyeIcon />
        <h1>&nbsp;- Control settings</h1>
      </div>
      <div className="middle-section">
        <div className="left-sidebar">
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('intro')}
          >
            Intro
          </button>
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('training')}
          >
            How to do stuff
          </button>
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('config')}
          >
            Control da Power
          </button>
        </div>
        <div className="content">
          <ContentPage />
        </div>
      </div>
      <div className="bottom-section footer">Made by Pi2</div>
      {/* <h2>Welcome, young Jedi Warrior!</h2>
      <p>
        You are just a step away from awakening the force within you. Be
        careful, and read the instructions, if you don't want this force to
        become a farce.
      </p>
      <p>
        This extension is super easy to use (I think), but here is a quick tuto
        for you, nonetheless.
      </p>
      Some thanks that must be given: names Click here to learn about these
      awesome, generous people creating tools which helped me create this tool. */}
      {/* 
      Stuff that might make you feel better: 
      * Your data is not going to be stolen. This extension, even though uses your camera, is not retrieving any data from. 
      If you are into the boring details, watch the popup you get when clicking here.

    * You control when to activate the extension:
    The extension, by default, is dormant. You know, like the bears wintertime. So, if you want to control any page by your eyes, you can do so by clicking
    enable on the little webgazer icons popup. You can also specify to always enable the extension on a certain page. 

    * You control more:
    You control stuff like algo sensitivity and scroll amount in the popup, so the extension fits your needs.
    By changing the ner... erm, dev options below, you can customize even the algorithm which the extension runs by.
    
    * You control all by your eyes, without special cameras.

    What might be a bother:
    * It will surely bring issues, when the page you apply the extension on, tries to use your camera as well.

    * The arrows might not always appear, due to the pages css options.

    * Some pages might have denied permissions to the scripts. 
    
    * You might get abducted by angry unicorns. 

    * The whole algorithm is still prone to errors, and sometimes it might perdict your eye movements badly. 
    Also, you might need to retrain the algo from time to time.

    * Because the javascript responsible for predicting eye coordinates eats more than a hungry hungry elephant, the page might face some performance difficulties.
    
    How to kick the extension in:

    Step 1. Send all your hard-earned cash to me.
    Step 2. Disregard Step 1, but in case you liked this extension and feel like you can afford a coffee to support me, click here: link
    
    Real step 1.
    Go to the page you want to i-control.

    Step 2.
    Click on the extension's icon.
    Click enable or always enable on this page button. After clicking once on the page, the algorithm will start to run, based on the configuration on the popup.

    Step 3. 
    Configure the popup, then, if it's the first time you eye-control this page, click on the tutorial button, and go thrugh it.

    Step 4.
    Start reading on the page. Make sure you gaze on the specific side you want to scroll towards.
    After looking at a side for long enough - given the algorithm didn't hit its head - you should start to see an arrow rising and a circul forming around it.
    When the arrow fully loads, it will do a cute animation, then go down, and a scroll will happen.

    If you want to cancel a scrolling, just look at the opposing side for a bit.

    Step 5.
    Meddle with the options page, and make the algo better, then send it to us :D

    Thank you for giving it a go, I hope it will be of some use for you. 

    If you have some hardships, like disabilities, then maybe you will use it to read long documents without needed interactions.

    If you are lazy to click, then... Start programming, lazy people make the best life-improving tools. Also, then you can
    use this tool to read stuff, like books, manga or comics while eating popcorn with two hands (img about it?)

    And finally, if you just tried it out because it seemed fun: I hope your curiosity got fulfilled!

    I'm looking forward to hear from you proposing to improve this extension, reporting bugs, or just saying hi.
    You can do any of these here: address

    */}
    </div>
  );
};

export default Options;
