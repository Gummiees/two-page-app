# TwoPageApp <a href="https://github.com/Gummiees/two-page-app/actions/workflows/firebase-hosting-merge.yml"><img src="https://github.com/Gummiees/two-page-app/actions/workflows/firebase-hosting-merge.yml/badge.svg" alt="Firebase deployment" style="max-width: 100%;"></a>

## URLs

This project is stored on GitHub (<https://github.com/Gummiees/two-page-app>) and **hosted with Firebase (<https://two-page-practise.web.app/es/>)**.

**This is important since the i18n feature only works on the hosted website, not locally. I will explain why a bit later on.**

## Run locally

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run buildpro` to build the project.

## Deploy

Must have Firebase properly configured. Run `npm run deploy`.

On push, a GitHub workflow is automatically fired to deploy the changes (<https://github.com/Gummiees/two-page-app/actions>).

## Checks...?

Didn't have time for it, but I usually use StyleLint and ESLint. Check my Angular template that I have to create projects quickly (<https://github.com/Gummiees/angular-template>).

I didn't use the template here to build it all from scratch.

## Tests...?

Didn't have time for it, but usually I do the unit tests with Jest and UI tests with Cypress.

## Problems faced

### Make the table responsive

This is always an issue because, as commented under `src/app/shared/components/table/table.component.scss`, I don't think there is a proper way to make a table responsive.

To me, the best solution would be to make each row collapsible, but this would take too much time for this challenge.

### i18n

I ran into a couple issues as it was the first time I've used i18n on the front. I usually make it so the backend has the translations and when you switch language, a backend request is made to get the languages.

I followed the Angular guides, but still couldn't quickly figure out how to make it work with a simple selector dinamically. What I've found only works for deployed versions, as it generates two folders under `dist` to be hosted.

Another issue I had was with the table headers, which I will go into detail next. The problem is that the headers are dynamic, meaning I don't know what the table will get there.

### Dynamic table

Rather than a problem this was more of a pain. I understand that this was made to demonstrate your skills on this challenge, but in a real scenario the headers should be passed to the table as an input.

This way it would be so much easier to translate and optimise the code, not having to through the table multiple times to do basic things as it happened with the Tasks component.

### Api calls

As discussed on the last interview we did, I usually make them return a `Promise`, since returning an `Observable` doesn't make much sense to me since it will only return one value and then close, which is more the definition of a `Promise`.

This means I'd have used `lastValueFrom`. However, I decided to use `Observables` to show some knowledge with RxJS.
