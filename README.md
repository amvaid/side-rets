# Getting Started

- Please read the INSTRUCTIONS.md first
- For any questions around Create React App (CRA), reference
  CRA_DOCUMENTATION.md

# Code and Design Decisions

<!-- Please document your code & design decisions here. -->

For the most part I was able to accomplish most of the requirements for this project. I was able to save all states to local storage, and managed to build designs for both mobile and desktop.

I introduced css-grid here in order to properly align all content based on the mocks.

For the api call, I set up a useEffect hook to fetch the property data only if the data already didn't exist in the local storage.

I also managed to make sure that a user clicking the favorite button was able to see their state on refresh as well, using local storage.



If I had more time, I would have liked to spend some more time on cleaning up the design. You'll notice that some images are different
sizes, and I would have preferred to keep these standardized, but couldn't get around to it. I also would have cleaned up the data set and only saved things to state and local storage if I needed them. I would have also done most of the formatting work as I was saving this data to the storage, rather than on the render itself. 

Please reach out if you have any questions.