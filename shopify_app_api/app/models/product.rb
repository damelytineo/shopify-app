class Product < ApplicationRecord
    validates_presence_of :image, :image_id, :description, :price
end
