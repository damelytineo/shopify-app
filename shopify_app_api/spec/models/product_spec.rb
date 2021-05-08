require 'rails_helper'

RSpec.describe Product, type: :model do

    subject { 
        described_class.new(
          image: "Anything",
          image_id: "Anything", 
          description: "Anything", 
          price: "Anything", 
        )
      }
    
    describe "Validations" do 
        it "is valid with valid attributes" do
            expect(subject).to be_valid
        end

        it "is not valid without an image" do
            subject.image = nil
            expect(subject).to_not be_valid
        end
            
        it "is not valid without an image_id" do
            subject.image_id = nil
            expect(subject).to_not be_valid
        end

        it "is not valid without a description" do
            subject.description = nil
            expect(subject).to_not be_valid
        end

        it "is not valid without an price" do
            subject.price = nil
            expect(subject).to_not be_valid
        end
    end

end