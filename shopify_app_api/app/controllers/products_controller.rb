class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    def show
        render json: Product.find_by(id: params[:id])
    end

    def create 
        image = Cloudinary::Uploader.upload(params[:image])
        product = Product.create(image: image["url"], image_id: image["public_id"], description: params[:description], price: params[:price] )
        render json: product
    end

    def update
        product = Product.find_by(id: params[:id])
        if product.update(price: params[:price] )
            render json: @product
        end
    end

    def destroy
        product = Product.find_by(id: params[:id])
        Cloudinary::Uploader.destroy(product.image_id, :invalidate => true) 
        product.destroy
    end

end
