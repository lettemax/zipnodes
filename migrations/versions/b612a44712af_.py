"""empty message

Revision ID: b612a44712af
Revises: 3af3fd407742
Create Date: 2021-03-23 19:26:10.347363

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b612a44712af'
down_revision = '3af3fd407742'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('politics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nonprofit_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=455), nullable=False),
    sa.Column('question', sa.String(length=200), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(length=35), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['nonprofit_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('politics')
    # ### end Alembic commands ###
