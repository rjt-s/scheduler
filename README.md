# Interview Scheduler

## Description

A single page application (SPA) built using React which will allow its users to view and book interview
appointments with their mentors

## Final Product
!['Schedular Intro Page'](https://github.com/rjt-s/scheduler/blob/master/docs/Scheduler-Demo.png?raw=true)
!['Schedular Form Page'](https://github.com/rjt-s/scheduler/blob/master/docs/Scheduler-Form.png?raw=true)

## Setup/ Getting Started

1. Create a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies with `npm install`.
4. Start the web server using the npm run local command. The app will be served at http://localhost:8000/.
5. Go to http://localhost:8000/ in your browser.

## Highlights

1. User can view all booked and empty appointments slots between Monday to Friday.
2. User can book an interview in an empty appointment slot.
3. User can delete/cancel an appointment slot.
4. User will be asked to confirm the action when they are deleting an interview.
5. Empty slots of each day are visible in the sidebar.
6. User is shown an error when interview cannot be booked or deleted.
7. The application makes api requests to load and persist data.

## Dependencies
axios
@testing-library/react-hooks
react-test-renderer
classnames
sass


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
