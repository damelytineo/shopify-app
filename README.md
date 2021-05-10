This is an image repository app built for merchants to update their inventory using Javascript and React on the front-end with a Ruby on Rails API back-end. The user uploads a product image, inputs a short description and a price for the product, and clicks submit to post their product. Product prices can be updated to reflect discounts or lower prices. Once a product is purchased, the merchant can remove the product from their listing.

Note: Images are uploaded using Cloudinary - a third-party cloud-based image and video management platform.

## Prerequisites
Before you begin, ensure you have ruby-2.6.3 and Node 8.16.0 or Node 10.16.0 or a later version installed.

Familiarize yourself with the following documentation and source code:

- Ruby on Rails Guides
- React Docs
- React Source Code

Important:  
If you don’t already have one, please register for a free Cloudinary account here: https://cloudinary.com/. Once you sign up, your credentials/account details (including Cloud Name, API Key, API Secret) will be integrated into the Rails API. These can be found on the top left-hand corner of your dashboard.

Under config/initializers, create a new file named cloudinary.rb. In this file, replace values with your newly obtained Cloudinary credentials wrapped in a string.
```
Cloudinary.config do |config|
  config.cloud_name = "cloud_name"
  config.api_key = "api_key"
  config.api_secret = "api_secret"
  config.secure = true
  config.cdn_subdomain = true
end
```
*If pushing code to GitHub, DO NOT forget to add this file to your ignore file!

## Installing
To install, follow these steps:

- Fork this repository onto your computer, then navigate into the project's directory, and run:
- bundle install from within shopify_app_api to install all of the gems/dependencies found in the Gemfile, including Rails
npm install from within shopify_app-client to install all required dependencies for React

## Using
Follow these steps:

- To start up the Rails server, make sure that you are in the root of the application in the terminal and run: rails s.
- To start the local server, run npm start - If the browser doesn't open, but the server started correctly, you can use the local links that appear in the terminal to access the app in the browser.

## Contributing
To contribute, please see the GitHub documentation on creating a pull request.

## License
This code is available as open-source under the terms of the MIT License.

## Contact
Please email Damely at damely.tineo07@gmail.com.
