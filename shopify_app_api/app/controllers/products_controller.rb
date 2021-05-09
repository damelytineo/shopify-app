class ProductsController < ApplicationController
    before_action :set_product, only: [:show, :update, :destroy]

    def index
        render json: Product.all
    end

    def show
        if @product 
            render json: @product
        else
            render :json => { :errors => product.errors}, status: :unprocessable_entity
        end
    end

    def create 
        image = Cloudinary::Uploader.upload(params[:image])
        product = Product.create(image: image["url"], image_id: image["public_id"], description: params[:description], price: params[:price] )

        if product.valid?
            render json: product, status: :created
        else
            render :json => { :errors => product.errors}, status: :unprocessable_entity
        end
    end

    def update
        if @product.update(price: params[:price] )
            render json: @product
        else 
            render :json => { :errors => @product.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        Cloudinary::Uploader.destroy(@product.image_id, :invalidate => true) 
        @product.destroy
    end

    private

    def set_product
        @product = Product.find_by(id: params[:id])
    end

    def product_params
        params.permit(:image, :description, :price, :image_id )
    end

end
