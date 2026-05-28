from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db import Base

class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=True)
    ticker = Column(String, nullable=True)
    documents = relationship('Document', back_populates='company')
    valuation = relationship('Valuation', back_populates='company', uselist=False)

class Document(Base):
    __tablename__ = 'documents'
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    source_type = Column(String, nullable=True)
    company_id = Column(Integer, ForeignKey('companies.id'), nullable=False)
    company = relationship('Company', back_populates='documents')

class Valuation(Base):
    __tablename__ = 'valuations'
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey('companies.id'), nullable=False)
    payload = Column(JSON, default={})
    company = relationship('Company', back_populates='valuation')
