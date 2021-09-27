'use strict';
const Alexa = require('ask-sdk');
const Util = require('./util');
const aplMainTemplate = require('./apl-main.json');
/***********
Data: Customize the data below as you please.
***********/


const SKILL_NAME = "Personality Quiz";
const HELP_MESSAGE_BEFORE_START = "Have you ever wondered what animal am I? Wonder no more! Before we play, answer five simple questions to find out your animal personality. Ready?";
const HELP_MESSAGE_AFTER_START = "Please say yes or no then I'll share your results at the end";
const HELP_REPROMPT = "Sure, when you complete all the questions, then I will tell you what your animal personality is";
const STOP_MESSAGE = "OK, let's play again sometime. Goddbye";
const MISUNDERSTOOD_INSTRUCTIONS_ANSWER = "PSorry, I didn't understand that. Go ahead and respond with yes or no";
const HINT_TEXT = `To play again, just say "Alexa, open ${SKILL_NAME}"`


const BACKGROUND_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/default.jpg";
// const BACKGROUND_IMAGE_URL =  "default.jpg";
const BACKGROUND_GOODBYE_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/goodbye.jpg";
// const BACKGROUND_GOODBYE_IMAGE_URL = "goodbye.jpg";
const BACKGROUND_HELP_IMAGE_URL = "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/help.jpg";
// const BACKGROUND_HELP_IMAGE_URL = "help.jpg";

const WELCOME_MESSAGE = "Welcome! Have you ever wondered what type of animal personality you have? To find out, answer five yes or no questions. Ready?";
const INITIAL_QUESTION_INTROS = [
  "Fantastic, we can begin",
  "<say-as interpret-as='interjection'>Super!</say-as>! Question one",
  "Awesome, let's start <say-as interpret-as='interjection'>Here we go question one</say-as>.",
  "<say-as interpret-as='interjection'>ok super, let's play</say-as>."
];
const QUESTION_INTROS = [
  "Ok, next question.",
  "Alrighty then",
  "You're pretty smart, for a human!",
  "Sounds great.",
  "Got it",
];
const UNDECISIVE_RESPONSES = [
  "<say-as interpret-as='interjection'>Honk</say-as>. No worries, I'll choose one.",
  "<say-as interpret-as='interjection'>Nanu Nanu</say-as>. I'm on it.",
  "<say-as interpret-as='interjection'>Uh oh</say-as>... well, let's go to the next question.",
  "<say-as interpret-as='interjection'>Aha</say-as>. No problem, we can move on.",
  "<say-as interpret-as='interjection'>Aw man</say-as>. What do you think about this question?",
];
const RESULT_MESSAGE = "Drum roll please! Your animal personality is"; // the name of the result is inserted here.
const RESULT_MESSAGE_SHORT = "This is the animal you are"; // the name of the result is inserted here.
const PLAY_AGAIN_REQUEST = "That was fun.  Would you like to play again?";

const resultList = {
  result1: {
    name: "Sloth",
    display_name: "Sloth",
    audio_message: "Peaceful and easygoing, sloths take things at their own pace and live moment to moment.",
    description: "Peaceful and easygoing, sloths take things at their own pace and live moment to moment. They are considerate, pleasant, caring, and mellow. Please Don't call them lazy they are just more relaxed than the rest of us..",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Red-knobbed.starfish.1200.jpg"
      //largeImageUrl: "result1.jpg",
    }
  },
  result2: {
    name: "Lion",
    display_name: "Lion",
    audio_message: "Lions are independent and logical thinkers who are also persuasive leaders.",
    description: " Independent and logical thinkers who are also persuasive leaders, Linos are business-minded and ambitious ready to sieze opportunity. ",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Aceria_anthocoptes.1200.jpg"
      //largeImageUrl: "result2.jpg",
    }
  },
  result3: {
    name: "Octopus",
    display_name: "Octopus",
    audio_message: "Independent types, wildly intelligent and creative.",
    description: "Independent types, wildly intelligent and creative.  Un-interested in what anyone else is doing and they work best when given freedom. They are acutely aware of their own intelligence, as well as what they don't know, and their passion often lies in conceptualizing ideas and processing complex theories.",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Anodorhynchus_hyacinthinus.1200.jpg"
      //largeImageUrl: "result3.jpg",
    }
  },
  result4: {
    name: "Otter",
    display_name: "Otter",
    audio_message: "Living in the moment and are incredibly playful, generous, and optimistic..",
    description: "Living in the moment and are incredibly playful, generous, and optimistic. They love being social and having new experiences. they would prefer to simply go with the flow and have a great time.",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Male_goat.1200.jpg"
      //largeImageUrl: "result4.jpg",
    }
  },
  result5: {
    name: "Parrot",
    display_name: "Parrot",
    audio_message: "Intelligence and competence trump over all other things.",
    description: "Intelligence and competence trump over all other things (both in themselves and in others). They are often described as witty, clever, cerebral, and resourceful. They are verbally creative thinkers and workers. They sometimes chatter.",
    img: {
      largeImageUrl: "https://coach-courses-us.s3.amazonaws.com/public/courses/voice/Example%20images%20skill%203/Bufo_boreas.1200.jpg"
      //largeImageUrl: "result5.jpg",
    }
  }
};

const questions = [{
    question: "Do you consider yourself pleasant, caring, or mellow?",
    questionDisplay: "Are you pleasant, caring or mellow?",
    background:  "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q1.jpg", 
    //background: "question1.jpg",
    points: {
      result1: 4,
      result2: 0,
      result3: 5,
      result4: 3,
      result5: 1
    }
  },
  {
    question: "Do you consider yourself a independent and logical thinker?",
    questionDisplay: "Are you a independent and logical thinker?",
    background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q2.jpg", 
    //background: "question2.jpg",
    points: {
      result1: 4,
      result2: 1,
      result3: 2,
      result4: 3,
      result5: 5
    }
  },
  {
    question: "Do you consider yourself wildly intelligent and creative rather un-interested in what anyone else is doing?",
    questionDisplay: "Are you wildly intelligent and creative?",
    background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q3.jpg", 
    //background: "question3.jpg",
    points: {
      result1: 0,
      result2: 5,
      result3: 1,
      result4: 3,
      result5: 4
    }
  },
  {
    question: "Do you consider yourself playful, generous, and optimistic. Do you love being social and having new experiences.?",
    questionDisplay: "Are you playful, generous, and optimistic?",
    background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q4.jpg", 
    //background: "question4.jpg",
    points: {
      result1: 2,
      result2: 3,
      result3: 4,
      result4: 4,
      result5: 5
    }
  },
  {
    question: "Do you consider yourself witty, clever, cerebral, and resourceful.?",
    questionDisplay: "Are you witty, clever, cerebral, and resourceful.?",
    background: "https://s3.amazonaws.com/coach-courses-us/public/courses/voice/2.7/q5.jpg", 
    //background: "question5.jpg",
    points: {
      result1: 0,
      result2: 5,
      result3: 3,
      result4: 4,
      result5: 5
    }
  }
];

/***********
Execution Code: Avoid editing the code below if you don't know JavaScript.
***********/

// Private methods (this is the actual code logic behind the app)



const newSessionHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlayingOrGettingResult = false;
    if (sessionAttributes.state) {
       isCurrentlyPlayingOrGettingResult = true;
    }


    return handlerInput.requestEnvelope.request.type === `LaunchRequest` || (!isCurrentlyPlayingOrGettingResult && request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.YesIntent' || request.intent.name === 'AMAZON.NoIntent'));
  },
  handle(handlerInput) {

    console.log('--------------------------------------- New session')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (handlerInput.requestEnvelope.request.type === `LaunchRequest`) {
      _initializeApp(sessionAttributes);
      return buildResponse(handlerInput, WELCOME_MESSAGE, WELCOME_MESSAGE, SKILL_NAME);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {

      sessionAttributes.state = states.QUIZMODE;

      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      console.log('--------------------------------------- Exit session')
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes();
      sessionAttributes.state = '';
      return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'UndecisiveIntent') {
      const outputSpeech = MISUNDERSTOOD_INSTRUCTIONS_ANSWER;
      return buildResponse(handlerInput, outputSpeech, outputSpeech, SKILL_NAME, BACKGROUND_IMAGE_URL,"");
    }
  },
};

const nextQuestionIntent = (handlerInput, prependMessage) => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  sessionAttributes.questionProgress++;
  var currentQuestion = questions[sessionAttributes.questionProgress].question;
  return {
    prompt: `${prependMessage} ${_randomQuestionIntro(sessionAttributes)} ${currentQuestion}`,
    reprompt: HELP_MESSAGE_AFTER_START,
    displayText: questions[sessionAttributes.questionProgress].questionDisplay,
    background: questions[sessionAttributes.questionProgress].background
  };
}

const resultIntent = (handlerInput, prependMessage) => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  const resultPoints = sessionAttributes.resultPoints;
  const result = Object.keys(resultPoints).reduce((o, i) => resultPoints[o] > resultPoints[i] ? o : i);
  const resultMessage = `${prependMessage} ${RESULT_MESSAGE} ${resultList[result].name}. ${resultList[result].audio_message}. ${PLAY_AGAIN_REQUEST}`;
  return {
    prompt: resultMessage,
    reprompt: PLAY_AGAIN_REQUEST,
    displayText: `${RESULT_MESSAGE_SHORT} ${resultList[result].name}`,
    background: resultList[result].img.largeImageUrl
  }

  // this.emit(':askWithCard', resultMessage, PLAY_AGAIN_REQUEST, resultList[result].display_name, resultList[result].description, resultList[result].img);
  //                        ^speechOutput  ^repromptSpeech     ^cardTitle                       ^cardContent                    ^imageObj
}

const RepeatIntentHandler = {
  canHandle(handlerInput) {
   return Alexa.getRequestType(handlerInput.requestEnvelope) ===   'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
   },
handle(handlerInput) {
    // Get the session attributes.
    const sessionAttributes =   
    handlerInput.attributesManager.getSessionAttributes(); 
    console.log('Repeat');
    console.log(sessionAttributes.lastPrompt);
   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
  }
};
	
const _randomIndexOfArray = (array) => Math.floor(Math.random() * array.length);
const _randomOfArray = (array) => array[_randomIndexOfArray(array)];
const _adder = (a, b) => a + b;
const _subtracter = (a, b) => a - b;

// Handle user input and intents:

const states = {
  QUIZMODE: "_QUIZMODE",
  RESULTMODE: "_RESULTMODE"
}



const quizModeHandler = {
  canHandle(handlerInput) {

    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlaying = false;
    if (sessionAttributes.state && sessionAttributes.state === states.QUIZMODE) {
      isCurrentlyPlaying = true;
    }

    return isCurrentlyPlaying;
  },
  handle(handlerInput) {
    console.log('---------------------------------------Quiz Mode')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var prependMessage = '';
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent') {
      const systemSpeak = nextQuestionIntent(handlerInput, prependMessage);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {
      _applyresultPoints(sessionAttributes, _adder);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      _applyresultPoints(sessionAttributes, _subtracter);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

    if (request.type === 'IntentRequest' && request.intent.name === 'UndecisiveIntent') {
      Math.round(Math.random()) ? _applyresultPoints(sessionAttributes, _adder) : _applyresultPoints(sessionAttributes, _subtracter);
      const systemSpeak = _nextQuestionOrResult(handlerInput, _randomOfArray(UNDECISIVE_RESPONSES));
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background,systemSpeak.displayText);
    }

  if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent') {
        console.log('Repeat');
    	console.log(sessionAttributes.lastPrompt);
	   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
	}
    
  
  },
};

const resultModeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    var isCurrentlyPlaying = false;
    if (sessionAttributes.state &&
      sessionAttributes.state === states.QUIZMODE) {
      isCurrentlyPlaying = true;
    }

    return !isCurrentlyPlaying && request.type === 'IntentRequest' && sessionAttributes.state === states.RESULTMODE;
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Result mode')
    const request = handlerInput.requestEnvelope.request;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent') {
      _initializeApp(sessionAttributes);
      sessionAttributes.state = states.QUIZMODE;
      const systemSpeak = _nextQuestionOrResult(handlerInput);
      return buildResponse(handlerInput, systemSpeak.prompt, systemSpeak.reprompt, SKILL_NAME, systemSpeak.background, systemSpeak.displayText);
    }
    if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent') {
      const attributesManager = handlerInput.attributesManager;
      const sessionAttributes = attributesManager.getSessionAttributes();
      sessionAttributes.state = '';
      return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    
    }
    
  if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.RepeatIntent') {
        console.log('Repeat');
    	console.log(sessionAttributes.lastPrompt);
	   return 	buildResponse (handlerInput, sessionAttributes.lastPrompt, sessionAttributes.lastReprompt, sessionAttributes.lastTitle, sessionAttributes.lastImage_url,  sessionAttributes.lastDisplayText, sessionAttributes.lastDisplay_type) 
	}
    


  },
};


const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Exit session')
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes.state = '';
    return buildResponse(handlerInput, STOP_MESSAGE, '', SKILL_NAME, BACKGROUND_GOODBYE_IMAGE_URL,STOP_MESSAGE);
    //------------------------------------------------
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    console.log('--------------------------------------- Help')
    const attributesManager = handlerInput.attributesManager;
    var speechOutput = '';
    const sessionAttributes = attributesManager.getSessionAttributes();
    if (sessionAttributes.state === states.QUIZMODE) {
       speechOutput = HELP_MESSAGE_AFTER_START;
    } else {
       speechOutput = HELP_MESSAGE_BEFORE_START;
    }
    const reprompt = HELP_REPROMPT;
    return buildResponse(handlerInput, speechOutput, reprompt, SKILL_NAME, BACKGROUND_HELP_IMAGE_URL);
  },
};
const UnhandledHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    console.log('---------------------------------------Unhandled')
    const outputSpeech = MISUNDERSTOOD_INSTRUCTIONS_ANSWER;
    return buildResponse(handlerInput, outputSpeech, outputSpeech, SKILL_NAME);
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

// Skill brain

const _initializeApp = handler => {
  // Set the progress to -1 one in the beginning
  handler.questionProgress = -1;
  // Assign 0 points to each animal
  var initialPoints = {};
  Object.keys(resultList).forEach(result => initialPoints[result] = 0);
  handler.resultPoints = initialPoints;
};

const _nextQuestionOrResult = (handlerInput, prependMessage = '') => {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  if (sessionAttributes.questionProgress >= (questions.length - 1)) {

    sessionAttributes.state = states.RESULTMODE;
    return resultIntent(handlerInput, prependMessage)


  } else {
    return nextQuestionIntent(handlerInput, prependMessage);
  }
};

const _applyresultPoints = (handler, calculate) => {
  const currentPoints = handler.resultPoints;
  const pointsToAdd = questions[handler.questionProgress].points;

  handler.resultPoints = Object.keys(currentPoints).reduce((newPoints, result) => {
    newPoints[result] = calculate(currentPoints[result], pointsToAdd[result]);
    return newPoints;
  }, currentPoints);
};

const _randomQuestionIntro = handler => {
  if (handler.questionProgress === 0) {
    // return random initial question intro if it's the first question:
    return _randomOfArray(INITIAL_QUESTION_INTROS);
  } else {
    // Assign all question intros to remainingQuestionIntros on the first execution:
    var remainingQuestionIntros = remainingQuestionIntros || QUESTION_INTROS;
    // randomQuestion will return 0 if the remainingQuestionIntros are empty:
    let randomQuestion = remainingQuestionIntros.splice(_randomIndexOfArray(remainingQuestionIntros), 1);
    // Remove random Question from rameining question intros and return the removed question. If the remainingQuestions are empty return the first question:
    return randomQuestion ? randomQuestion : QUESTION_INTROS[0];
  }
};

// Utilities


let buildResponse = (handlerInput, prompt, reprompt, title = SKILL_NAME, image_url = BACKGROUND_IMAGE_URL,  displayText = prompt.replace(/(<([^>]+)>)/gi, ""), display_type = "BodyTemplate7" ) => {
  console.log(title);
  	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
	sessionAttributes.lastPrompt = prompt;
	sessionAttributes.lastReprompt = reprompt;
	sessionAttributes.lastTitle = title;
	sessionAttributes.lastImage_url = image_url;
	sessionAttributes.lastDisplayText = displayText;
	sessionAttributes.lastDisplay_type = display_type;
  if (reprompt) {
    handlerInput.responseBuilder.reprompt(reprompt);
  } else {
    handlerInput.responseBuilder.withShouldEndSession(true);
  }
   var response ;
  if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
     response = getDisplay(handlerInput, title,  prompt, image_url, display_type).responseBuilder;
  } else {
     response = handlerInput.responseBuilder.speak(prompt)
            
  }
  return response.withSimpleCard(title, displayText).getResponse();
}
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  return hasDisplay;
}


function getDisplay(handlerInput, title, displayText, image_url, display_type){
	if (!image_url.includes('https://')) {
		image_url=Util.getS3PreSignedUrl("Media/"+image_url);
	}
	

	console.log("the display type is => " + display_type);
    console.log(image_url);
    var VISUAL_TOKEN = 'showthis';
            // Create Render Directive
            
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                datasources: {
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": image_url,
                                            "size": "large"
                                        }
                                    ]
                                },
                                "textContent": {
                                    "primaryText": {
                                        "type": "PlainText",
                                        "text": displayText.replace(/(<([^>]+)>)/gi, "")
                                    }
                                },

                                "hintText": HINT_TEXT,
                                "welcomeSpeechSSML": `<speak>${displayText}</speak>`
                            },
                            "transformers": [
                                {
                                    "inputPath": "welcomeSpeechSSML",
                                    "transformer": "ssmlToSpeech",
                                    "outputName": "welcomeSpeech"
                                }
                            ]
                        }
                    },
                token: VISUAL_TOKEN,
                document: aplMainTemplate
            });
            
	
	return handlerInput;
}

// Init

  const skillBuilder = Alexa.SkillBuilders.custom();
  exports.handler = skillBuilder
    .addRequestHandlers(
      SessionEndedRequestHandler, HelpIntentHandler, ExitHandler, newSessionHandler, quizModeHandler, resultModeHandler, RepeatIntentHandler,  UnhandledHandler
    )
    //.addErrorHandlers(ErrorHandler)
    .lambda();
