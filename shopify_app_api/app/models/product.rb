class Product < ApplicationRecord
    validates_presence_of :image, :image_id, :description, :price
    
    validates :price, numericality: { greater_than: 0}
end
