---
layout: default
title:  Whack-a-mole
nav_order: 21
---
# Documentation for Whack-a-mole
{: .no_toc  }
* This documentation is written for `Whack-a-mole` game, try this simple experiment [Here](http://www.kathrynschuler.com/experiment-library/WAM-JS/original-whack-a-mole.html)
* Source code for this documentation is hosted in [GitHub](https://github.com/kschuler/experiment-library/tree/master/WAM-JS)
* Visit this [Documentation](http://www.kathrynschuler.com/experiment-library/demo-experiment-simple-RA/readme.html)

### Table of Contents
{: .no_toc .text-delta }





*  ## Goal for this Simple Experiments
{:toc}


*  ## The Structure of  the Simple Experiment
{:toc}

This simple experiment is from [jsPsych Tutorial](https://www.jspsych.org/tutorials/rt-task/). The task is to press one key for a blue colored circle and another key for an orange colored circle. The **structure** of this `simple expemiment`:
1. <span style="color:blue">*HTML file* </span>: `demo-experiment-simple-RT/demo-experiment-simple-RT.html`
2. <span style="color:blue">*JavaScript file* </span>: `js/jspsych-6.0.5/jspsych.js` and  `js/yaml.js`, etc.
3. <span style="color:blue">*YAML file* </span>: `demo-experiment-simple-RT/params.yaml`provides parameters for HTML file.  
4. `params.yaml` pass parameters to `demo-experiment-simple-RT.html` through `yaml.js` .

The HTML file is the skeleton of the behavioral experiment. It mainly utilizes JavaScript library  [jsPysch](https://www.jspsych.org/) to implement the interactive experiment. YAML file is to provide parameters for the skeleton of the experiment of HTML file. 

* ## How to Modify YAML file?
{: toc}

We prove an example on how to implements the yaml file, that is, how to provide parameter for the skeleton for the experiments.

- ###  1. Welcome and Instruction 
{: toc}

Provide welcom message on the landing page.
```yaml
welcome:
     stimulus: "Welcome to the experiment. Press any key to begin!"
```
- ###  2. Give Instructions to users
{: toc}

Tip: use `>` to render content in one line. 
```yaml
instructions:
    stimulus: > # use'>' sign to render content in one line
        <p>In this experiment, a circle will appear in the center
        of the screen.</p><p>If the circle is <strong>blue</strong>,
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div class='float: right;'><img src='img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
```
- ###  3. Set Up Test Trial
{:toc}

* Define the tag for the experiments, it make your life easier when you want to calculate the test results.
* Set up the path for images and tags and other details.

```yaml
test_stimuli: 
    tag: 'test' # set the path 
    blue:
        path: "img/blue.png"   # set the path
        key: 'f'  # set the correct response
    orange:
        path: "img/orange.png"
        key: 'j'

fixation:
    stimulus: '<div style="font-size:60px;">+</div>'
    durations_possibilities: 
    # the options for random time interval between tests.
    [250, 500, 750, 1000, 1250, 1500, 1750, 2000]
    tag: 'fixation'# set the tag for fixation.
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ5MDIyMTM2OF19
-->