class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    def show
        render json: @product
    end

    def create 
        image = Cloudinary::Uploader.upload(params[:image])
        @product = Product.create(image: image["url"], description: params[:description], price: params[:price] )
    end

end
