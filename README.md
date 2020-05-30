# 42 MATTERS PROJECT: DOCKERIZED SOLUTION.

This `Docker-based` Solution to the 42 MATTERS Project. This Repository contains
all the necessary Files and Directories to run this Application from Docker containers.

## Installation

Simply clone this Repository or download the ZIP Archive. At the root of the cloned
or unzipped directory, you'd find a `docker-compose.yml` File. In your Terminal, change
to the aforementioned root Directory and issue the following command:

```sh
  # IF YOU ARE NOT ALREADY IN THE 42-matters DIRECTORY,
  # YOU MAY NEED TO CHANGE DIRECTORY INTO IT LIKE SO:
  cd 42-matters
  # ONCE YOU ARE WITHIN THE DIRECTORY, THEN RUN:
  docker-compose build; docker-compose up
```

Again, this Command should be executed at the very top-level of the Directory resulting cloned
or downloaded from this Repository. Executing the Command above will pull-in build and run the App
from within Docker. After this, the next step would be to view the App in a Web-Browser.

## Running the Application

### Prerequisite

Please, be sure that `port 8000` and `port 8080` are Free on your System as both the Frontend & Backend tiers
of this App rely on those ports by default - although it is quite possible to change the ports anyways.

### Enter Express Server and the Browser

The Backend of this App runs at: `http://0.0.0.0:8000`
To be a little bit more specific: `http://0.0.0.0:8000/api/v1/fetch-all`

To see the Frontend-tier of this App, please visit: `http://0.0.0.0:8080`  
From there on, you can interact with the Application to see if all the necessary requirements were met.

-- Poiz Campbell

## IMPORTANT

- The are 2 Sub-Directories within the root of the Project Folder: `ftm-backend` and `ftm-frontend`,
  which each represent the Backend-Tier and the Frontend-Tier respectively. Within each of those
  Directories is a `README.md` File suited specifically to the Tier in question. Please, be sure to
  to read through those `README` Files as they contain necessary and detailed information regarding this
  Project.

## Screenshots

![alt](./docker-screen-shot-01.png)
