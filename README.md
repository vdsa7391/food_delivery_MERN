# 🍔 Food Delivery Website

This is a fully functional and responsive food delivery website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. Users can browse through a variety of food items, place orders, and manage their orders. Additionally, there is an admin panel that allows administrators to monitor orders, add new food items, and perform other management tasks.

## Table of Contents
- Features
- Demo
- Technologies Used
- Usage
- Project Structure
- Contributing
- License

## Features
### User Features
- **Responsive Design**: Accessible on all devices (desktop, tablet, mobile).
- **Browse Food Items**: Explore a wide variety of food options.
- **Place Orders**: Add food items to the cart, review orders, and checkout.
- **Order Management**: View order history and track order status.

### Admin Features
- **Order Management**: View, update, and manage customer orders.
- **Add/Edit Food Items**: Admins can add new food items or edit existing items.
- **Dashboard**: Overview of total orders, sales, and more analytics.

## Demo
A live demo of the project can be found here: 
-**User panel**: https://food-delivery-mern-1-front.onrender.com
-**Admin Panel**: https://food-delivery-mern-1-q5wg.onrender.com

## Technologies Used
- **Frontend**: React.js, CSS, Bootstrap/Tailwind for styling
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication

## Usage

### Client
- **User Login/Register**: Users can register and log in to manage their orders.
- **Browse Menu**: Browse through the list of food items, add to cart, and place an order.
  
### Admin
- **Dashboard**: Accessible at `/admin`. Admin users can manage orders and add new food items.
- **Order Management**: View, update, and manage orders.
- **Add/Edit Food Items**: Create new food items or edit existing items with details like price, description, etc.

## Project Structure
```
food-delivery-website/
├── client/               # React frontend user panel
│   ├── public/           # Public assets
│   ├── src/              # React source files
│   └── ...
├── server/               # Express.js backend
│   ├── config/           # Database and environment configurations
│   ├── controllers/      # API controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── ...
├── admin/               # React frontend admin panel
│   ├── public/           # Public assets
│   ├── src/              # React source files
│   └── ...
|  
└── README.md
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

---

This README file covers the basic project information, setup instructions, usage guide, and project structure for easy understanding and quick onboarding for any new developer or contributor. Let me know if there’s anything you’d like to customize!
