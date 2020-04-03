# -*- coding: utf-8 -*-
{
    'name': 'POS Custom',
    'version': '1.0',
    'summary': 'POS Custom',
    'sequence': 10,
    'author': '',
    'description': """
        POS Custom
    """,
    'depends': [
        'point_of_sale',
    ],
    'data': [
        'views/point_of_sale.xml',
    ],
    'demo': [
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
    'application': True,
}
