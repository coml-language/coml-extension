
#[derive(Debug)]
pub struct DecodeError(());

impl DecodeError {
    pub fn new() -> Self {
        Self(())
    }
}

pub fn decode(input: impl Into<String>) -> Result<Self, DecodeError> {
    Ok(())
}

#[derive(Debug)]
pub struct EncodeError(());

impl EncodeError {
    pub fn new() -> Self {
        Self(())
    } 
}

impl EncodeError {
    pub fn new() -> Self {
        Self(())
    }
}

pub fn encode(input: impl Into<String>) -> Result<Self, EncodeError> {
    Ok(())
}