# Pokedex UI Testing Series: End to End React Native tests with Maestro — Part 2

Maestro supports testing React Native screens and apps on both Android and iOS platforms. With Maestro, you can perform end-to-end tests for React Native screens and apps on both Android and iOS platforms, making it a versatile tool for UI testing your Pokedex app.

## Prerequisites

To follow along, refer to the blog <https://blog.mobile.dev/pokedex-ui-testing-series-getting-started-with-maestro-in-expo-react-native-part-1-73c6dfaa072> 

## Setup

Before writing a UI test using Maestro, it's a good idea to configure your workspace.

To do so, in the .maestro directory, create a config.yaml file with the following contents:

```yaml
# config.yaml
flows:
  - journey/*
```

This configures Maestro to look for flows in the journey directory.

## Structuring your tests

The way Maestro tests are structure is opinionated. You can structure your tests with what makes sense for your app. We have written a blog post on structuring test by feature. You can read it here: https://blog.mobile.dev/maestro-best-practices-structuring-your-test-suite-54ec390c5c82

In this post, we will be structuring our tests by journey and subflow.

Create a directory called journey in the .maestro directory. This is where we will be writing our tests and it will refer to subflows.

## Writing your first test

In the journey directory, create a file called pokemon-lookup.yaml. Our app is a Pokedex app, so we will be writing a test for a user journey to look up a Pokemon.

Here is the test:

```yaml
appId: ${APP_ID}
onFlowStart:
  - runFlow: ../common/setup.yaml
  - startRecording: recording-pokemon-lookup-journey
onFlowComplete:
  - stopRecording
---
# Check Region List
- runFlow: ../subflow/region-list.yaml

# Check Pokemons in a Region
- runFlow: ../subflow/pokemons-in-region.yaml

# Search for a Pokemon
- runFlow: ../subflow/search-pokemon.yaml

# Check Pokemon Details
- runFlow: ../subflow/pokemon-details.yaml
```

Let's break down the test:

- appId: ${APP_ID} - This is the app id of the app you want to test. You can find this in the app.json file of your app.

- onFlowStart: - This is a list of actions to perform before the test starts. In this case, we are running a setup flow and starting a recording.

- onFlowComplete: - This is a list of actions to perform after the test completes. In this case, we are stopping the recording.

- runFlow: - This is a list of subflows to run. In this case, we are running a subflow to check the region list, pokemons in a region, search for a pokemon, and check pokemon details.

Looks like we have a lot of subflows to write. Let's get started.

## Writing your first subflow

In the .maestro directory, create a directory called subflow. This is where we will be writing our subflows.

In the subflow directory, create a file called region-list.yaml. This is where we will be writing our subflow to check the region list.

Here is the subflow:

```yaml
appId: ${APP_ID}
---
- assertVisible: ".*Regions.*"
- takeScreenshot: "regions"
- assertVisible:
    id: "name-kanto"
- assertVisible:
    id: "gen-1"
- tapOn:
    id: "name-kanto"
```

Let's break down the subflow:

- appId: ${APP_ID} - This is the app id of the app you want to test. You can find this in the app.json file of your app.

- assertVisible: ".*Regions.*" - This asserts that the text Regions is visible on the screen.

- takeScreenshot: "regions" - This takes a screenshot of the screen and saves it as regions.png.

- assertVisible: id: "name-kanto" - This asserts that the text Kanto is visible on the screen.

Let's pause. You will notice that we are using id selectors to find elements on the screen. IDs are preferrable to text selectors as they help to remove flakiness in your tests if the text changes.

## How to add IDs to your React Native app for Maestro

To add IDs to your React Native app, you can simply use the testID prop. For example:

```jsx
<Text testID="id-value" className="font-600 text-lg text-white capitalize">
```

However, if your Text component is nested in a TouchableOpacity component, you will need to add the accessible={false} prop to the TouchableOpacity component. For example:

```jsx
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full"
      onPress={() => navigate("list", { name, gen })}
      accessible={false} // add accessible={false} prop to outer component
    >
      <ImageBackground source={imageSource} imageStyle={{ borderRadius: 16 }}>
        <LinearGradient
            // hidden for brevity
        >
          <View>
            <Text testID={`name-${name}`} className="font-600 text-lg text-white capitalize"> // add testID prop
              {name}
            </Text>
            <Text testID={`gen-${gen}`} className="font-500 text-xs text-gray-200 uppercase"> // add testID prop
              {gen}ª Generation
            </Text>
          </View>
            // hidden for brevity
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
```

Learn more: https://maestro.mobile.dev/platform-support/react-native#interacting-with-nested-components-on-ios

Let's continue.

- assertVisible: id: "gen-1" - This asserts that the text 1ª Generation is visible on the screen.

- tapOn: id: "name-kanto" - This taps on the Kanto region.

## Writing your second subflow

In the subflow directory, create a file called pokemons-in-region.yaml. This is where we will be writing our subflow to check the pokemons in a region.

Here is the subflow:

```yaml
appId: ${APP_ID}
---
- assertVisible: ".*Kanto.*"
- takeScreenshot: "kanto-region-pokemon-list-1"
- assertVisible: ".*Bulbasaur.*"
- swipe:
    direction: UP
    duration: 4000
- takeScreenshot: "kanto-region-pokemon-list-2"
```

Let's break down the subflow:

- appId: ${APP_ID} - This is the app id of the app you want to test. You can find this in the app.json file of your app.

- assertVisible: ".*Kanto.*" - This asserts that the text Kanto is visible on the screen.

- takeScreenshot: "kanto-region-pokemon-list-1" - This takes a screenshot of the screen and saves it as kanto-region-pokemon-list-1.png.

- assertVisible: ".*Bulbasaur.*" - This asserts that the text Bulbasaur is visible on the screen.

- swipe: direction: UP duration: 4000 - This swipes up on the screen for 4000 milliseconds.

- takeScreenshot: "kanto-region-pokemon-list-2" - This takes a screenshot of the screen and saves it as kanto-region-pokemon-list-2.png.

## Writing your third subflow

In the subflow directory, create a file called search-pokemon.yaml. This is where we will be writing our subflow to search for a pokemon.

Here is the subflow:

```yaml
appId: ${APP_ID}
---
- tapOn:
    id: "search-icon"
- takeScreenshot: "search-pokemon-blank"
- inputText: ${output.pokemon.input}
- takeScreenshot: "search-pokemon-${output.pokemon.input}"
- runFlow:
    when:
      platform: Android
    commands:
      - back
- runFlow:
    when:
      platform: iOS
    commands:
      - tapOn: "return"
- tapOn:
    id: "name-${output.pokemon.name}"
```

Let's break down the subflow:   

- appId: ${APP_ID} - This is the app id of the app you want to test. You can find this in the app.json file of your app.

- tapOn: id: "search-icon" - This taps on the search icon.

- takeScreenshot: "search-pokemon-blank" - This takes a screenshot of the screen and saves it as search-pokemon-blank.png.

- inputText: ${output.pokemon.input} - This inputs the text from the output of the previous subflow into the search field.

Let's pause. You will notice that we are using output.pokemon.input to get the input text from the previous subflow.

Where does this output come from?

## Create a script file init.js in common directory

In the common directory, create a file called init.js.

Here is the script:

```js
output.pokemon = {
    name: 'mewtwo',
    input: 'mewtw',
}
```

Let's break down the script:

- output.pokemon = { name: 'mewtwo', input: 'mewtw', } - This creates an output object with a pokemon object that has a name and input property.

- name: 'mewtwo' - This is the name of the pokemon we want to search for.

- input: 'mewtw' - This is the input text we want to input into the search field.

Let's continue.

- takeScreenshot: "search-pokemon-${output.pokemon.input}" - This takes a screenshot of the screen and saves it as search-pokemon-${output.pokemon.input}.png.

- runFlow: when: platform: Android commands: - back - This taps on the back button on Android.

- runFlow: when: platform: iOS commands: - tapOn: "return" - This taps on the return button on iOS.

- tapOn: id: "name-${output.pokemon.name}" - This taps on the pokemon name.

## Writing your fourth subflow

In the subflow directory, create a file called pokemon-details.yaml. This is where we will be writing our subflow to check the pokemon details.

Here is the subflow:

```yaml
appId: ${APP_ID}
---
- assertVisible: ".*${output.pokemon.name}.*"
- takeScreenshot: "${output.pokemon.name}-pokemon-details"
- assertVisible: ".*Genetic.*"
- assertVisible: ".*Psychic.*"
- assertVisible: ".*This pokemon does not evolve.*"
```


Let's break down the subflow:

- appId: ${APP_ID} - This is the app id of the app you want to test. You can find this in the app.json file of your app.

- assertVisible: ".*${output.pokemon.name}.*" - This asserts that the text of the pokemon name is visible on the screen.

- takeScreenshot: "${output.pokemon.name}-pokemon-details" - This takes a screenshot of the screen and saves it as ${output.pokemon.name}-pokemon-details.png.

- assertVisible: ".*Genetic.*" - This asserts that the text Genetic is visible on the screen.

- assertVisible: ".*Psychic.*" - This asserts that the text Psychic is visible on the screen.

- assertVisible: ".*This pokemon does not evolve.*" - This asserts that the text This pokemon does not evolve is visible on the screen.

## Running your test

To run your test, run the following command:

```bash
maestro test -e APP_ID=com.thekharche.maestroexpopokedex .maestro/journey/pokemon-lookup.yaml
```

## Conclusion

In this post, we learned how to write a UI test for a Pokedex app using Maestro. We learned how to structure our tests by journey and subflow. We also learned how to write subflows to check the region list, pokemons in a region, search for a pokemon, and check pokemon details.