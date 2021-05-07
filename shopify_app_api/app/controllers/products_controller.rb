class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    def show
        render json: Product.find_by(id: params[:id])
    end

    def create 
        image = Cloudinary::Uploader.upload(params[:image])
        product = Product.create(image: image["url"], description: params[:description], price: params[:price] )
    end

    def update
        product = Product.find_by(id: params[:id])
        if product.update(price: params[:price] )
            render json: @product
        end
    end

end
