class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    # upload the actual image (request?)sent from the client to Cloudinary, 
    # Once upload success, C. sends a response containing the URL strings of the image. What we store in our Rails database is not the actual image but the URL strings to where it is stored in Cloudinary.
    def create 
        image = Cloudinary::Uploader.upload(params[:image])
        @product = Product.create(image: image["url"])
    end

end
