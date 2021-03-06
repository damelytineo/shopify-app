require 'rails_helper'

RSpec.describe ProductsController, type: :request do
    context 'GET #index' do
        it 'returns a success response' do 
            product = Product.create!(image: 'image', image_id: 'image_id', description: 'description', price: 1)
            product = Product.create!(image: 'image2', image_id: 'image_id2', description: 'description2', price: 2)
            get "/products"
            expect(JSON(response.body).length).to eq(2)
        end
    end

    context 'GET #show' do
        it 'returns a success response' do 
            product = Product.create!(image: 'image', image_id: 'image_id', description: 'description', price: 1)
            get "/products/#{product.id}"
            expect(JSON(response.body)["id"]).to eq(product.id)
        end
    end

    context 'POST #create' do
        it 'returns a success response' do
            # create file
            file = Rack::Test::UploadedFile.new(Rails.root.join("spec", "fixtures", "ruby.png"), "image/jpg")

            # stub call to Cloudinary
            stub_request(:any, /api.cloudinary.com/).to_return(body: { url: 'fake_url', public_id: 'id'}.to_json)
            
            post "/products", :params => { :image => file, :description => 'testing', :price => 1 }, :headers => headers
            expect(response.content_type).to eq('application/json')
            expect(JSON(response.body)["description"]).to eq("testing")
        end
    end

    context 'PATCH #update' do
        it 'returns a success response'  do
            product = Product.create!(image: 'image', image_id: 'image_id', description: 'description', price: 1)
            patch "/products/#{product.id}", :params => { :price => 100 }, :headers => headers
            expect(response.content_type).to eq('application/json')
            expect(JSON(response.body)["price"]).to eq("100.0")
        end
    end

    context 'DELETE #destroy' do
        it 'finds Product by ID, destroys it' do  
            product = Product.create!(image: 'image', image_id: 'image_id', description: 'description', price: 1)
            # stub call to Cloudinary
            stub_request(:any, /api.cloudinary.com/).to_return(body: {}.to_json)
            delete "/products/#{product.id}"
            expect(Product.all.length).to eq(0)
        end
    end
end