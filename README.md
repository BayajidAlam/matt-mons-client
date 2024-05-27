```bash
git commit -m "Initial commit: starting project setup"
git commit -m "feat: add user authentication"
git commit -m "fix: resolve issue with form validation"
git commit -m "chore: refactor component structure"
git commit -m "service: added authentication service functionality"
git commit -m "docs: update installation instructions"
git commit -m "style: improve code formatting"
git commit -m "test: add unit tests for user service"
```


## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [System Design](#system-design)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Usage](#usage)

## Project Overview

Welcome to the frontend repository of matt-mons, the innovative multi vendor ecommerce Management System designed to streamline your ecommerce management experience. Firstly I will go with MVP which will meet the minimum requirements to run our initial business, which means I am prioritising the user fetching feature and the manager roll feature that will be developed first. Here I am  planning version(v1) requirements.

 This frontend repository works in conjunction with the matt-mons backend, providing a user-friendly interface for managing vehicles efficiently.

- First priority(V1)
- Later Version(V2)

## Technology Stack

- **Next.js:** React framework for building user interfaces.
- **Ant Design:** UI library for React components.
- **Tailwind CSS:** Utility-first CSS framework.
- **Redux:** State management for React applications.
- **Socket.io:** Real-time bidirectional event-based communication.
- **Framer Motion:** Animation library for React components.
- **EmailJS:** Service for sending emails directly from client-side JavaScript.


## System Design

The system should meet the following requirements:

### Functional requirements

I will design the system for five diffrent role Customer, Sells Manager, Seller, Admin, Super Admin

**Customers**

- Buy, wishlist, or report product
- Checkout cart
- Take AI guidance to shop (v2)
- View,search and filter products
- Make and Track Order
- Read blogs
- Contact with supports or chat with sales manager(V2)
- Take the help of map to navigate towards shop(V2)


**Sells Manager**

- Create Product
- Edit product(availability and others)
- Accept order
- Update tracking
- Chat with customer(V2)


**Seller**

- Assign or create, remove managers to his shop and products
- Remove reported item
- Create discount, Offer
- Create Product
- Edit product(availability and others)
- Accept order
- Update tracking
- Chat with customer(V2)


**Admin**

- Verify and edit,ban seller
- Add, change the content of the application
- Manage the Sells and Seller of the software
- Business supervision
- Assist seller and sales manager to get a better user experience
- Collect feedback from seller and Sells manager


**Admin**
- Add, remove a admin
- Business supervision


### Non-Functional requirements

- High reliability.
- High availability with minimal latency.
- The system should be scalable and efficient(V2)

### Extended requirements

- Customers can rate the product, shop after it's completed.
- Payment processing.
- Metrics and analytics(V2).

## Estimation and Constraints

Let's start with the estimation and constraints.

### Traffic

Let us assume we have 100 million daily active users (DAU) with 1 million drivers and on average our platform enables 10 million rides daily.
Let us assume we have 10000 active users(DAU) 
If on average each user performs 10 actions (such as request a check available product, addtoCart, checkout, etc.) we will have to handle 100000 requests daily.

$$
10000 \times 10 \space actions = 100000 \space /day
$$

**What would be Requests Per Second (RPS) for our system?**

100000 requests per day translate into 1.15 requests per second.

$$
\frac{100000 \space}{(24 \space hrs \times 3600 \space seconds)} = \sim 1.15 \space requests/second
$$

### Storage

If we assume each user comsume on average is 400 bytes, we will require about 0.04 GB of database storage every day.

$$
100000 \space \times 400 \space bytes = \sim 0.04 \space GB/day
$$

And for 10 years, we will require about 146 GB of storage.

$$
0.04 \space GB \times 10 \space years \times 365 \space days = \sim 146 \space GB
$$

### Bandwidth

As our system is handling 0.04 GB of ingress every day, we will require a minimum bandwidth of around 0.462 KB per second.

$$
\frac{0.04 \space GB}{(24 \space hrs \times 3600 \space seconds)} = \sim 0.462 \space KB/second
$$

### High-level estimate

Here is our high-level estimate:

| Type                      | Estimate        |
| ------------------------- | -----------     |
| Daily active users (DAU)  | 10000           |
| Requests per second (RPS) | 1.15/s          |
| Storage (per day)         | ~0.04 GB        |
| Storage (10 years)        | ~146 GB         |
| Bandwidth                 | ~0.462 KB/s     |

## Data model design

This is the general data model which reflects our requirements.

![uber-datamodel](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/uber/uber-datamodel.png)

We have the following tables:

**customers**

This table will contain a customer's information such as `name`, `email`, and other details.

**drivers**

This table will contain a driver's information such as `name`, `email`, `dob` and other details.

**trips**

This table represents the trip taken by the customer and stores data such as `source`, `destination`, and `status` of the trip.

**cabs**

This table stores data such as the registration number, and type (like Uber Go, Uber XL, etc.) of the cab that the driver will be driving.

**ratings**

As the name suggests, this table stores the `rating` and `feedback` for the trip.

**payments**

The payments table contains the payment-related data with the corresponding `tripID`.

### What kind of database should we use?

While our data model seems quite relational, we don't necessarily need to store everything in a single database, as this can limit our scalability and quickly become a bottleneck.

We will split the data between different services each having ownership over a particular table. Then we can use a relational database such as [PostgreSQL](https://www.postgresql.org) or a distributed NoSQL database such as [Apache Cassandra](https://cassandra.apache.org/_/index.html) for our use case.

## API design

Let us do a basic API design for our services:

### Request a Ride

Through this API, customers will be able to request a ride.

```tsx
requestRide(customerID: UUID, source: Tuple<float>, destination: Tuple<float>, cabType: Enum<string>, paymentMethod: Enum<string>): Ride
```

**Parameters**

Customer ID (`UUID`): ID of the customer.

Source (`Tuple<float>`): Tuple containing the latitude and longitude of the trip's starting location.

Destination (`Tuple<float>`): Tuple containing the latitude and longitude of the trip's destination.

**Returns**

Result (`Ride`): Associated ride information of the trip.

### Cancel the Ride

This API will allow customers to cancel the ride.

```tsx
cancelRide(customerID: UUID, reason?: string): boolean
```

**Parameters**

Customer ID (`UUID`): ID of the customer.

Reason (`UUID`): Reason for canceling the ride _(optional)_.

**Returns**

Result (`boolean`): Represents whether the operation was successful or not.

### Accept or Deny the Ride

This API will allow the driver to accept or deny the trip.

```tsx
acceptRide(driverID: UUID, rideID: UUID): boolean
denyRide(driverID: UUID, rideID: UUID): boolean
```

**Parameters**

Driver ID (`UUID`): ID of the driver.

Ride ID (`UUID`): ID of the customer requested ride.

**Returns**

Result (`boolean`): Represents whether the operation was successful or not.

### Start or End the Trip

Using this API, a driver will be able to start and end the trip.

```tsx
startTrip(driverID: UUID, tripID: UUID): boolean
endTrip(driverID: UUID, tripID: UUID): boolean
```

**Parameters**

Driver ID (`UUID`): ID of the driver.

Trip ID (`UUID`): ID of the requested trip.

**Returns**

Result (`boolean`): Represents whether the operation was successful or not.

### Rate the Trip

This API will enable customers to rate the trip.

```tsx
rateTrip(customerID: UUID, tripID: UUID, rating: int, feedback?: string): boolean
```

**Parameters**

Customer ID (`UUID`): ID of the customer.

Trip ID (`UUID`): ID of the completed trip.

Rating (`int`): Rating of the trip.

Feedback (`string`): Feedback about the trip by the customer _(optional)_.

**Returns**

Result (`boolean`): Represents whether the operation was successful or not.

## High-level design

Now let us do a high-level design of our system.

### Architecture

We will be using [microservices architecture](https://karanpratapsingh.com/courses/system-design/monoliths-microservices#microservices) since it will make it easier to horizontally scale and decouple our services. Each service will have ownership of its own data model. Let's try to divide our system into some core services.

**Customer Service**

This service handles customer-related concerns such as authentication and customer information.

**Driver Service**

This service handles driver-related concerns such as authentication and driver information.

**Ride Service**

This service will be responsible for ride matching and quadtree aggregation. It will be discussed in detail separately.

**Trip Service**

This service handles trip-related functionality in our system.

**Payment Service**

This service will be responsible for handling payments in our system.

**Notification Service**

This service will simply send push notifications to the users. It will be discussed in detail separately.

**Analytics Service**

This service will be used for metrics and analytics use cases.

### How is the service expected to work?

Here's how our service is expected to work:

![uber-working](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/uber/uber-working.png)

1. Customer requests a ride by specifying the source, destination, cab type, payment method, etc.
2. Ride service registers this request, finds nearby drivers, and calculates the estimated time of arrival (ETA).
3. The request is then broadcasted to the nearby drivers for them to accept or deny.
4. If the driver accepts, the customer is notified about the live location of the driver with the estimated time of arrival (ETA) while they wait for pickup.
5. The customer is picked up and the driver can start the trip.
6. Once the destination is reached, the driver will mark the ride as complete and collect payment.
7. After the payment is complete, the customer can leave a rating and feedback for the trip if they like.


### Payments

Handling payments at scale is challenging, to simplify our system we can use a third-party payment processor like [Stripe](https://stripe.com) or [PayPal](https://www.paypal.com). Once the payment is complete, the payment processor will redirect the user back to our application and we can set up a [webhook](https://en.wikipedia.org/wiki/Webhook) to capture all the payment-related data.

### Notifications

Push notifications will be an integral part of our platform. We can use a message queue or a message broker such as [Apache Kafka](https://kafka.apache.org) with the notification service to dispatch requests to [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging) or [Apple Push Notification Service (APNS)](https://developer.apple.com/documentation/usernotifications) which will handle the delivery of the push notifications to user devices.

_For more details, refer to the [WhatsApp](https://karanpratapsingh.com/courses/system-design/whatsapp#notifications) system design where we discuss push notifications in detail._

## Detailed design

It's time to discuss our design decisions in detail.


## Identify and resolve bottlenecks

![uber-advanced-design](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/uber/uber-advanced-design.png)

Let us identify and resolve bottlenecks such as single points of failure in our design:

- "What if one of our services crashes?"
- "How will we distribute our traffic between our components?"
- "How can we reduce the load on our database?"
- "How to improve the availability of our cache?"
- "How can we make our notification system more robust?"

To make our system more resilient we can do the following:

- Running multiple instances of each of our services.
- Introducing [load balancers](https://karanpratapsingh.com/courses/system-design/load-balancing) between clients, servers, databases, and cache servers.
- Using multiple read replicas for our databases.
- Multiple instances and replicas for our distributed cache.
- Exactly once delivery and message ordering is challenging in a distributed system, we can use a dedicated [message broker](https://karanpratapsingh.com/courses/system-design/message-brokers) such as [Apache Kafka](https://kafka.apache.org) or [NATS](https://nats.io) to make our notification system more robust.

## Getting Started

To get started with the VehiTrack frontend, follow these steps:

1. Clone the repository: `git clone [frontend_repository_url]`
2. Install dependencies: `yarn install`
3. Configure environment variables. (Contact with developer team)
4. Start the development server: `yarn dev`

For more detailed instructions and configuration options, refer to the [Documentation Link](https://docs.google.com/document/d/1p9UTRG0EbPuOUZziWcvhrJbCLFHpTxKn5TNf2t-Sji0/edit?usp=sharing).

## Folder Structure

The frontend codebase follows a modular and organized folder structure:

- `/src`
  - `/app`: main app router pages.
  - `/components`: Reusable React components.
  - `/assets`: External resource of assets like images.
  - `/redux`: Redux store setup and actions.
  - `/api`: API requests and integration with the backend.

## Usage

To interact with the VehiTrack frontend, follow these steps:

1. **Installation:**

   - Clone the frontend repository: `git clone [frontend_repository_url]`
   - Install dependencies: `yarn install`

2. **Configuration:**

   - If necessary, configure environment variables. Check the [Documentation Link](#) for any specific configuration requirements.

3. **Development Server:**

   - Start the development server: `yarn dev`
   - Open your browser and navigate to `http://localhost:3000` to access the VehiTrack application in development mode.

4. **User Authentication:**

   - Use the predefined user accounts for testing:
     - **Super Admin:**
       - User ID: SA00001
       - Password: 123456
     - **Admin:**
       - User ID: A00001
       - Password: 123456
     - **Driver:**
       - User ID: D00001
       - Password: 123456
     - **Helper:**
       - User ID: H00001
       - Password: 123456

5. **Explore Features:**

   - Navigate through the dashboard to access different features:
     - Manage Vehicles, Drivers, and Helpers.
     - Plan Trips and record expenses.
     - Use the real-time collaborative chat system.
     - View reports and analytics for insights.

6. **Animation with Framer Motion:**

   - Experience smooth and interactive animations integrated with Framer Motion.

7. **Real-time Communication with Socket.io:**

   - Test the real-time collaborative chat system that fosters seamless communication among team members.

8. **Email Integration with EmailJS:**
   - Explore functionalities that involve email communication directly from the client-side using EmailJS.
