import React from 'react';

const IntroPage = () => {
  return (
    <div>
      <h2>Welcome, young Jedi Warrior!</h2>
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
      awesome, generous people creating tools which helped me create this tool.
      Stuff that might make you feel better: * Your data is not going to be
      stolen. This extension, even though uses your camera, is not retrieving
      any data from. If you are into the boring details, watch the popup you get
      when clicking here. * You control when to activate the extension: The
      extension, by default, is dormant. You know, like the bears wintertime.
      So, if you want to control any page by your eyes, you can do so by
      clicking enable on the little webgazer icons popup. You can also specify
      to always enable the extension on a certain page. * You control more: You
      control stuff like algo sensitivity and scroll amount in the popup, so the
      extension fits your needs. By changing the ner... erm, dev options below,
      you can customize even the algorithm which the extension runs by. * You
      control all by your eyes, without special cameras. What might be a bother:
      * It will surely bring issues, when the page you apply the extension on,
      tries to use your camera as well. * The arrows might not always appear,
      due to the pages css options. * Some pages might have denied permissions
      to the scripts. * You might get abducted by angry unicorns. * The whole
      algorithm is still prone to errors, and sometimes it might perdict your
      eye movements badly. Also, you might need to retrain the algo from time to
      time. * Because the javascript responsible for predicting eye coordinates
      eats more than a hungry hungry elephant, the page might face some
      performance difficulties.
    </div>
  );
};

export default IntroPage;
